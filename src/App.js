import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import ClienteList from './components/Clientes/ClienteList';
import ClienteForm from './components/Clientes/ClienteForm';
import ClienteDetails from './components/Clientes/ClienteDetails';

import ImovelList from './components/Imoveis/ImovelList';
import ImovelForm from './components/Imoveis/ImovelForm';
import ImovelDetails from './components/Imoveis/ImovelDetails';

import CompraList from './components/Compras/CompraList';
import CompraForm from './components/Compras/CompraForm';
import CompraDetails from './components/Compras/CompraDetails';

import ReservaList from './components/Reservas/ReservaList';
import ReservaForm from './components/Reservas/ReservaForm';
import ReservaDetails from './components/Reservas/ReservaDetails';

import CadastroForm from './components/Auth/CadastroForm';
import LoginForm from './components/Auth/LoginForm';
import { AuthProvider } from './contexts/AuthContext';

import './App.css'; // Certifique-se de ter um arquivo CSS para estilos gerais

function App() {
  return (
    <AuthProvider>
        <Router>
          <div className="App">
            <header className="header">
              <Navbar />
            </header>
            <div className="container">
              <Routes>
                <Route path="/cadastro" element={<CadastroForm />} />
                <Route path="/login" element={<LoginForm />} />

                <Route path="/clientes" element={<ClienteList />} />
                <Route path="/clientes/novo" element={<ClienteForm />} />
                <Route path="/clientes/:id/editar" element={<ClienteForm />} />
                <Route path="/clientes/details/:id" element={<ClienteDetails />} />

                <Route path="/imoveis" element={<ImovelList />} />
                <Route path="/imoveis/novo" element={<ImovelForm />} />
                <Route path="/imoveis/:id/editar" element={<ImovelForm />} />
                <Route path="/imoveis/details/:id" element={<ImovelDetails />} />

                <Route path="/compras" element={<CompraList />} />
                <Route path="/compras/novo" element={<CompraForm />} />
                <Route path="/compras/:id/editar" element={<CompraForm />} />
                <Route path="/compras/details/:id" element={<CompraDetails />} />

                <Route path="/reservas" element={<ReservaList />} />
                <Route path="/reservas/novo" element={<ReservaForm />} />
                <Route path="/reservas/:id/editar" element={<ReservaForm />} />
                <Route path="/reservas/details/:id" element={<ReservaDetails />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
