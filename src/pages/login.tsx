"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");
      router.push("/movies");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <div className="container-login-register">
      <h2 className="title">Log in</h2>
      <form onSubmit={handleLogin}>
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-label">
          Password:
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="submit-btn" type="submit">
          Log in
        </button>
      </form>
      <Link href="/register" className="register-link">
        Register
      </Link>
    </div>
  );
}
