import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  query,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { Carousel } from "react-bootstrap";

const API_KEY = "d0a97fc052097018bb41a342cb55b9b8";

export default function PopularMovies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<any>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [dataMovies, setDataMovies] = useState<any[]>([]);
  const [movie, setMovie] = useState<string>("");
  const [fileteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [movieImages, setMovieImages] = useState<any[]>([]);

  const router = useRouter();
  const movieId = 100;

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/images`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setMovieImages(response.data.posters);
      } catch (error) {
        console.error("Error fetching movie images:", error);
      }
    };

    fetchMovieImages();
  }, [movieId]);

  console.log("Movie Images", movieImages);
  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: API_KEY,
              page: page,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };
    fetchMovieGenres();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsSnapshot = await getDocs(
          query(collection(db, "comments"))
        );
        const commentsData = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();

    const unsubscribe = onSnapshot(collection(db, "comments"), (snapshot) => {
      const updatedComments: any[] = [];
      snapshot.forEach((doc) => {
        updatedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(updatedComments);
    });

    return unsubscribe;
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleCommentSubmit = async (movieId: string) => {
    try {
      if (user == null) {
        router.push("/login");
        return;
      }
      if (comment === "") {
        alert("Escribe un mensaje");
        return;
      }

      await addDoc(collection(db, "comments"), {
        movieId: movieId,
        comment: comment,
        userId: user.uid,
        userEmail: user.email,
      });

      setComment("");
      console.log("Comentario agregado correctamente");
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteDoc(doc(db, "comments", commentId));
      console.log("Comentario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  const handleGenreSelect = (genreId: string) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    return selectedGenres.every((genreId) => {
      return movie.genre_ids.includes(parseInt(genreId));
    });
  });

  const openList = () => {
    setOpenMenu(!openMenu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: movie,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error al obtener las películas por palabra clave:", error);
    }
  };

  useEffect(() => {
    const updatedFilteredMovies = movies.filter((movie) => {
      return selectedGenres.every((genreId) => {
        return movie.genre_ids.includes(parseInt(genreId));
      });
    });
    setDataMovies([]);
    setFilteredMovies(updatedFilteredMovies);
  }, [movies, selectedGenres]);

  console.log("Movie images", movieImages);

  return (
    <>


      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <Carousel fade className="carousel-content">
          {filteredMovies.slice(0, 6).map((movie) => (
            <Carousel.Item key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="Movie Poster"
              />
              {/* <Carousel.Caption>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="main-filter-container">
      <button className="btn-filter" onClick={openList}>
        <img src="/images/lupa2.png" alt="magnifying glass icon"/>
      </button>

      <div className={openMenu ? "filter-container open" : "filter-container"}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button type="submit">Search</button>
        </form>
        <div>
          <ul>
            {dataMovies.map((movie) => (
              <li key={movie}>{movie.original_title}</li>
            ))}
          </ul>
        </div>
      
        <div>
          {/* <button className="button-genre">Filter by Genre</button> */}
          <div>
            {genres.map((movieGenre) => (
              <div key={movieGenre.id} className="checkbox-container">
                <input
                  type="checkbox"
                  value={movieGenre.id}
                  checked={selectedGenres.includes(movieGenre.id)}
                  onChange={() => handleGenreSelect(movieGenre.id)}
                />
                <label>{movieGenre.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      <div className="movies-main-container">
        <div>
          <h1>Latest Releases</h1>
          <div className="movies-container">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-details">
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="comment-section">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => {
                      if (e.target.value.length <= 100) {
                        setComment(e.target.value);
                      }
                    }}
                    placeholder="Escribe un comentario"
                  />
                  <button
                    onClick={() => handleCommentSubmit(movie.id)}
                    // disabled={!user}
                    className={user ? "logged-in" : "logged-out"}
                  >
                    Publicar
                  </button>
                  {comments.some((comment) => comment.movieId === movie.id) ? (
                    <div className="comment-padding">
                      <h6>Comments</h6>
                      <ul>
                        {comments
                          .filter((comment) => comment.movieId === movie.id)
                          .map((comment) => (
                            <div className="comment-container">
                              <p>{comment.userEmail} dice:</p>
                              <li key={comment.id}>
                                {comment.comment.length > 100
                                  ? `${comment.comment.substring(0, 100)}...`
                                  : comment.comment}
                                {user && comment.userId === user.uid && (
                                  <div className="movies-btn-container">
                                    <button
                                      onClick={() =>
                                        handleDeleteComment(comment.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </li>
                            </div>
                          ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="comment-padding">
                      <h6>No comments</h6>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="movies-btn-pages">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <button onClick={handleNextPage}>Siguiente</button>
          </div>
        </div>
      </div>
    </>
  );
}
