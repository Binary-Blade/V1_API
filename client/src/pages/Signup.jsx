import React, { useState, useContext } from 'react'; // Importer useContext
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext'; // Importer AuthContext

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: '',
  });
  const navigate = useNavigate();

  const { setAuthToken } = useContext(AuthContext); // Obtenir setAuthToken depuis le contexte

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting signup request...');
    try {
      const response = await axios.post(
        'http://localhost:8000/api_v1/users/signup',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Signup response received', response);
      console.log('Response data:', response.data);

      if (response.status === 201) {
        setAuthToken(response.data.token); // Utiliser setAuthToken depuis le contexte
        navigate('/homepage'); // Redirect to home page or dashboard
      } else {
        console.error('Error during registration', response.data);
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={user.passwordConfirm}
          onChange={handleChange}
        />
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
