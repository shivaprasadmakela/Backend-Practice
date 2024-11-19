import React, { useState } from 'react';
import { register } from '../services/AuthService';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate(); // Correcting this line

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(form.name, form.email, form.password);
            alert('Registration successful!');
            navigate('/login');  // Corrected this line to use navigate
        } catch (error) {
            alert('Registration failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className='emailTextbox' name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" className='emailTextbox' name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" className='emailTextbox' name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit" className='signUpButton'>Register</button>
        </form>
    );
};

export default Register;
