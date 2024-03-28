"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuario registrado exitosamente:", userCredential.user);
      router.push('/movies');
    } catch (error: any) {
      console.error("Error al registrar usuario:", error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="title">Registro de Usuario</h2>
        <label className="form-label">
          Correo Electrónico:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-label">
          Contraseña:
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="submit-btn" onClick={handleRegister}>
          Registrarse
        </button>
        <Link href="/login" className="register-link">
          Login
        </Link>
      </div>
    </>
  );
}
