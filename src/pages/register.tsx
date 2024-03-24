"use client"
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado exitosamente:', userCredential.user);
    } catch (error: any) {
      console.error('Error al registrar usuario:', error.message);
    }
  };

  return (
    <>
    <div>
      <h2>Registro de Usuario</h2>
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
      <button onClick={handleRegister}>Registrarse</button>
    </div>
    <Link href='/login'>Login</Link> 
    </>
  );
}
