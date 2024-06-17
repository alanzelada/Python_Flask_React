import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', telefono: '' });

  // Function to get a user by ID
  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // Function to create a new user
  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', newUser);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  useEffect(() => {
    fetchUser(1); // Example: Fetch user with ID 1 on component mount
  }, []);

  return (
    <div>
      <h1>Flask y React </h1>
      {user && (
        <div>
          <h2>Detalles</h2>
          <p>ID: {user.id}</p>
          <p>Nombre: {user.name}</p>
          <p>Telefono: {user.telefono}</p>
        </div>
      )}

      <h2>Crear nuevo usuario</h2>
      <form onSubmit={(e) => { e.preventDefault(); createUser(); }}>
        <label>
          Nombre:
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Telefono:
          <input
            type="text"
            value={newUser.telefono}
            onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Crear usuario</button>
      </form>
    </div>
  );
};

export default App;
