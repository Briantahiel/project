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


const API_KEY = "d0a97fc052097018bb41a342cb55b9b8";

export default function PopularMovies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

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
      if (!user) {
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

  return (
    <div className="movies-main-container">
      <h1>Últimos estrenos</h1>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-details">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
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
                disabled={!user}
              >
                Publicar
              </button>
              {comments.some((comment) => comment.movieId === movie.id) ? (
                <div className="comment-padding">
                  <h6>Comentarios</h6>
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
                                  Eliminar
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
                  <h6>Sin comentarios</h6>
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
        <button onClick={handleNextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
