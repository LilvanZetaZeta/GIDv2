import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/molecules/RegisterForm.css';

function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 6 && hasNumber && hasSpecial;
  };

  const validateEmailDomain = (email) => {
    return email.endsWith('@duocuc.cl') || email.endsWith('@profesor.duoc.cl');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios');
      setSuccess(false);
      return;
    }

    if (!validateEmailDomain(email)) {
      setError('Solo se permite registro con @duocuc.cl o @profesor.duoc.cl');
      setSuccess(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres, un número y un carácter especial');
      setSuccess(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
      setError('Este correo ya está registrado');
      setSuccess(false);
      return;
    }

    const updatedUsers = [...users, { name, email, password }];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setError('');
    setSuccess(true);

    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Registro de usuario</h2>

      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Tu nombre"
        value={form.name}
        onChange={handleChange}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="ejemplo@duocuc.cl"
        value={form.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Contraseña</label>
      <div className="password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Contraseña segura"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="toggle-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <button type="submit" className="submit-button">Registrarse</button>

      {error && <p className="text-error">{error}</p>}
      {success && <p className="text-success">Registro exitoso ✅ Redirigiendo...</p>}
    </form>
  );
}

export default RegisterForm;
