import React, { useState, useEffect } from 'react';
import './favorite.css';
import Axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';
import TestElem from './TestElem'


function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavoredMovied = () => {
    Axios.post('/api/favorite/getFavoredMoive', {
      userFrom: localStorage.getItem('userId')
    })
      .then((response) => {
        const {success, favorites: resFavorites} = response.data
        if(success) {
          console.log(response.data);
          setFavorites(resFavorites);
        } else {
          alert('영화 정보를 가져오는데 실패 햇습니다.');
        }
      });
  }

  useEffect(() => {
    fetchFavoredMovied();
  }, []);

  const renderCards = favorites.map((favorite, index) => {
    const content = (
      <div>
        {
          favorite.moviePost ?
            <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> :
            'no Image'
        }
      </div>
    );
    const removeClickHandler = (movieId, userFrom) => {
      const variables = {
        movieId,
        userFrom
      };

      Axios.post('/api/favorite/removeFormFavorite', variables)
        .then((response) => {
          if(response.data.success) {
            fetchFavoredMovied();
          } else {
            alert('리스트에서 지우는데 실패했습니다.')
          }
        })
      
    }

    return (
      <tr key={index}>
        <Popover content={content} title={favorite.movieTitle}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td><button onClick={() => {removeClickHandler(favorite.movieId, favorite.userFrom)}}>Remove</button></td>
      </tr>
    )
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto'}}>
      <TestElem />
      <h2> Favorite Movies</h2>
      <h3 />
      
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
