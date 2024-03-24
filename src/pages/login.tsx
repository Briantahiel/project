
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseCredentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
      router.push('/movies');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
     <Link href='/register'>Registrarse</Link> 
    </div>
  );
}

