import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const API_KEY = "d0a97fc052097018bb41a342cb55b9b8";

const MovieDetailsPage = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [movieDetail, setMovieDetail] = useState<any>(null);
  console.log(movieDetail)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setMovieDetail(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (movieId) {
      fetchData();
    }
  }, [movieId]);

  if (!movieDetail) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='details-main-container'>
      <div className='detail-img-container'>
        <img src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`} alt="Movie Poster"/>
      </div>
      <div className='detail-info-container'>
        <p>Título: {movieDetail.title}</p>
        <p>{movieDetail.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
