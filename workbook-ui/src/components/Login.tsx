import React, { useState } from 'react';
import { login } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(form.email, form.password);
            localStorage.setItem('token', response.data); // Save JWT token
            navigate('/books');
        } catch (error) {
            alert('Login failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" className='emailTextbox' name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" className='emailTextbox' name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit" className='signUpButton'>Login</button>
        </form>
    );
};

export default Login;
