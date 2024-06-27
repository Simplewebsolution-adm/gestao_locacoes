// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/index'); 
  };

  return (
    <div className="navbar" id="navbar">
      <ul className="navbar-list">
        {user && (
          <>
            <div className="navbar-main">
              <li><Link to="/clientes">Clientes</Link></li>
              <li><Link to="/produtos">Produtos</Link></li>
              <li><Link to="/vendas">Vendas</Link></li>
              <li><Link to="/compras">Compras</Link></li>
            </div>
            <div className="navbar-user-container">
              <li className="navbar-user">
                <span>Bem-vindo, {user.username}</span>
                <button onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </li>
            </div>
          </>
        )}
        <div className="navbar-main">
          {!user && <li><Link to="/login">Entrar</Link></li>}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
