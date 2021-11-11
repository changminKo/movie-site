import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Button} from 'antd';

function Favorite(props) {
  const {movieInfo: {title: movieTitle, backdrop_path: moviePost, runtime: movieRunTime}, movieId, userFrom} = props;
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  };
  const favoriteClickHandler = () => {
    if(favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables)
        .then((response) => {
          if(response.data.success) {
            setFavoriteNumber((prevState) => prevState - 1);
            setFavorited((prevState) => !prevState);
          } else {
            alert('Favortie 리스트에서 지우는걸 실패했습니다.');
          }
        });
    } else {
      Axios.post('/api/favorite/addToFavorite', variables)
        .then((response) => {
          if(response.data.success) {
            setFavoriteNumber((prevState) => prevState + 1);
            setFavorited((prevState) => !prevState);
          } else {
            alert('Favortie 리스트에 추가하는걸 실패했습니다.');
          }
        });
    }
  };

  useEffect(() => {
    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        if(response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert('숫자 정보를 가져오는데 실패 했습니다.');
        }
      });

    Axios.post('/api/favorite/favorited', variables)
      .then(response => {
        if(response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert('정보를 가져오는데 실패 했습니다.');
        }
      });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
      <Button onClick={favoriteClickHandler}>{favorited ? 'Not Favorite' : 'Add to Favorite'} {favoriteNumber}</Button>
    </div>
  );
};

export default Favorite;
