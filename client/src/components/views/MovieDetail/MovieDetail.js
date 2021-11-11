import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row } from 'antd';

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState(null);
  const [actorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&langauge=ko-KR`;
    const endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&langauge=ko-KR`;
    fetch(endPointInfo)
      .then((response) => response.json())
      .then(response => {
        setMovie(response);
      });

    fetch(endPointCrew)
      .then((response) => response.json())
      .then(response => {
        setCasts(response.cast);
      });
  }, []);

  const toggleClickHandler = () => {
    setActorToggle(!actorToggle)
  }

  return (
    <>
    {movie &&
      <div>
        <MainImage
          image={`${IMAGE_BASE_URL}w1280/${movie.backdrop_path}`}
          title={movie.original_title}
          text={movie.overview}
        />

        <div style={{ width: '85%', margin: '1rem auto'}}>
          <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>

          <MovieInfo movie={movie} />
          <br />

          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
            <button onClick={toggleClickHandler}>Toggle Actor View</button>
          </div>
          
          {actorToggle &&
            <Row gutter={[16, 16]}>
              {casts && casts.map((cast, index) => {
                return (<React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path ?
                      `${IMAGE_BASE_URL}w500/${cast.profile_path}` :
                      null
                    }
                    characterName={cast.name}
                  />
                </React.Fragment>)
              })}
            </Row>
          }
        </div>
      </div>
    }
    </>
  );
}

export default MovieDetail;
