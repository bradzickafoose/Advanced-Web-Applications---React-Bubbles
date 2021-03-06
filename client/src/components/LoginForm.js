import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const LoginForm = () => {

    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: ''
    });

    const { push } = useHistory();

    const handleChange = event => {
        setUserCredentials({
            ...userCredentials,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        axiosWithAuth()
            .post('/login', userCredentials)
            .then(response => {
                localStorage.setItem('token', response.data.payload);
                push('/bubbles');
            })
            .catch(error => console.error('login error', error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    value={userCredentials.username}
                    onChange={handleChange}
                />
                <input
                    type='password'
                    name='password'
                    value={userCredentials.password}
                    onChange={handleChange}
                />
                <button type='submit'>Log in</button>
            </form>
        </div>
    )
}

export default LoginForm;