import React, {useEffect, useState} from 'react';
import { Row } from 'antd';
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { API_KEY } from '../../dev.js'
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';


function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchMovies = () => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&langauge=ko-KR&page=${currentPage + 1}`

    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies((prevMovie) => [...prevMovie, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      })
  }

  useEffect(() => {
    fetchMovies();
  },[]);

  const loadMoreItems = () => {
    fetchMovies();
  }

  return (
    <div style={{ width: '100%', margin: '0'}}>
      {
        mainMovieImage &&
        <MainImage
          image={`${IMAGE_BASE_URL}w1280/${mainMovieImage.backdrop_path}`}
          title={mainMovieImage.original_title}
          text={mainMovieImage.overview}
        />
      }
      <div style={{ width: '85%', margin: '1rem auto'}}>
        <h2>Mojvies by latest</h2>
        <hr />
        
        <Row gutter={[16, 16]}>
          {movies && movies.map((movie, index) => {
            return (<React.Fragment key={index}>
              <GridCards
                landingPage={true}
                image={
                  movie.poster_path ?
                  `${IMAGE_BASE_URL}w500/${movie.poster_path}` :
                  null
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            </React.Fragment>)
          })}
        </Row>
      </div>

      <div style={{display:'flex', justifyContent:'center'}}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
