import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authServiceMock from './../../services/mockAuthService';
import { useAuth } from '../../contexts/AuthContext';
import styles from './css/LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authServiceMock.login(email, password);
      login(response.data.user);
      setError(null); // Resetar o erro se o login for bem sucedido
      navigate('/index'); 
    } catch (error) {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginFormContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
          {error && <p>{error}</p>}
          <p>
            Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
