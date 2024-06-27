import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import InputMask from 'react-input-mask';
import styles from './css/CadastroForm.module.css';

const CadastroForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('PF'); // Default to Pessoa Física
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      await register(username, password);
      setError('');
      navigate('/login');
    } catch (error) {
      setError('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return 'Fraca';
    }
    if (password.length < 10) {
      return 'Média';
    }
    return 'Forte';
  };

  return (
    <div className={styles.container}>
      <div className={styles.cadastroFormContainer}>
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  value="PF"
                  checked={userType === 'PF'}
                  onChange={() => setUserType('PF')}
                />
                Pessoa Física
              </label>
              <label>
                <input
                  type="radio"
                  value="PJ"
                  checked={userType === 'PJ'}
                  onChange={() => setUserType('PJ')}
                />
                Pessoa Jurídica
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>{userType === 'PF' ? 'Nome:' : 'Razão Social:'}</label>
            <input type="text" value={name.toUpperCase()} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label>{userType === 'PF' ? 'CPF:' : 'CNPJ:'}</label>
            <InputMask
              mask={userType === 'PF' ? '999.999.999-99' : '99.999.999/9999-99'}
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
              required
            />
          </div>
          {userType === 'PF' && (
            <div className={styles.formGroup}>
              <label>Data de Nascimento:</label>
              <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
            </div>
          )}
          <div className={`${styles.formGroup} ${styles.passwordToggle}`}>
            <label title="Senha deve conter ao menos 1 maiúscula, 1 número e 1 caracter especial">Senha:</label>
            <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} required />
            <div className={`${styles.passwordStrength} ${styles[passwordStrength.toLowerCase()]}`}>{passwordStrength}
              <label className={styles.labelMostraSenha} htmlFor="showPassword">Mostrar senha</label>
              <input
                className={styles.inputMostraSenha}
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Confirmar Senha:</label>
            <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit">Registrar</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CadastroForm;
