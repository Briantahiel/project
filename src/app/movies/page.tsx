
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { collection, addDoc, query, where, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import { auth } from '../../firebaseConfig';

const API_KEY = 'd0a97fc052097018bb41a342cb55b9b8';

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [comments, setComments] = useState([]); // Estado para almacenar los comentarios
  const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null); 

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: API_KEY,
            page: page,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
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
        const commentsSnapshot = await getDocs(query(collection(db, 'comments')));
        const commentsData = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    // Suscribirse a cambios en la colección de comentarios en tiempo real
    const unsubscribe = onSnapshot(collection(db, 'comments'), (snapshot) => {
      const updatedComments = [];
      snapshot.forEach((doc) => {
        updatedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(updatedComments);
    });

    return unsubscribe;
  }, []); // Se ejecuta solo una vez al cargar la página

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleCommentSubmit = async (movieId) => {
    try {
      if (!user) {
        router.push('/login');
        return;
      }

      await addDoc(collection(db, 'comments'), {
        movieId: movieId,
        comment: comment,
        userId: user.uid,
        userEmail: user.email, // Agregamos el correo electrónico del usuario que hizo el comentario
      });

      setComment('');
      console.log('Comentario agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el comentario:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      console.log('Comentario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
    }
  };

  return (
    <div>
      <h1>Películas Populares</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe un comentario"
            />
            <button onClick={() => handleCommentSubmit(movie.id)} disabled={!user}>Enviar comentario</button>
            <div>
              <h3>Comentarios</h3>
              <ul>
                {comments
                  .filter((comment) => comment.movieId === movie.id)
                  .map((comment) => (
                    <li key={comment.id}>
                      {comment.comment}
                      {user && comment.userId === user.uid && ( // Mostrar el botón de eliminar solo si el usuario actual es el autor del comentario
                        <button onClick={() => handleDeleteComment(comment.id)}>Eliminar</button>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Página anterior
      </button>
      <button onClick={handleNextPage}>Página siguiente</button>
    </div>
  );
}
