import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard'; // Dashboard ko import kiya

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state track karne ke liye

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert("Login Successful! 🚀");
      
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true); // Login hote hi state badal do
    } catch (err) {
      alert("Login Failed! Please check your credentials.");
    }
  };

  // Agar user logged in hai, toh Dashboard dikhao
  if (isLoggedIn) {
    return <Dashboard />;
  }

  // Agar logged in nahi hai, toh Login Form dikhao
  return (
    <div style={{ 
      padding: '50px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      fontFamily: 'Arial' 
    }}>
      <h2>🚀 Fact-Checker Login</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          style={{ padding: '10px' }}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={{ padding: '10px' }}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button 
          onClick={handleLogin}
          style={{ 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default App;