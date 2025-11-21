import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authApi';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { ErrorMessage } from '../atoms/ErrorMessage';
import toast from 'react-hot-toast';
import '../../styles/components/organisms/LoginForm.css'; // Reutiliza el CSS

export const RegisterForm = () => {
  const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => setData({ ...data, [e.target.placeholder.toLowerCase()]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await registerUser(data); toast.success('Registrado'); navigate('/login'); }
    catch (err) { setError(err.response?.data?.message || 'Error'); }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <Input placeholder="Firstname" onChange={handleChange} required />
      <Input placeholder="Lastname" onChange={handleChange} required />
      <Input type="email" placeholder="Email" onChange={handleChange} required />
      <Input type="password" placeholder="Password" onChange={handleChange} required />
      <ErrorMessage message={error} />
      <Button type="submit">Registrar</Button>
    </form>
  );
};