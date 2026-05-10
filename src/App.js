import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard'; // Dashboard ko import kiya

// --- APNA LIVE BACKEND URL ---
const BACKEND_URL = "https://fact-checker-api-8qgm.onrender.com";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state track karne ke liye

  const handleLogin = async () => {
    try {
      // ✅ Ab ye seedha Render ke live server par request bhejega
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
      
      alert("Login Successful! 🚀");
      
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true); // Login hote hi Dashboard load ho jayega
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login Failed! Please check your credentials or Server wake-up time.");
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
      fontFamily: 'Arial',
      marginTop: '30px',
      backgroundColor: '#f4f7f6',
      minHeight: '100vh'
    }}>
      <div style={{ 
        padding: '30px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        width: '380px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>🚀 Fact-Checker Login</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            style={{ 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ccc',
              fontSize: '14px' 
            }}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={{ 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ccc',
              fontSize: '14px' 
            }}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            onClick={handleLogin}
            style={{ 
              padding: '12px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Login
          </button>
        </div>

        {/* --- DEMO CREDENTIALS SECTION --- */}
        <div style={{ 
          marginTop: '25px', 
          padding: '10px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '5px',
          border: '1px solid #dee2e6'
        }}>
          <p style={{ margin: '0', fontSize: '13px', color: '#495057' }}>
            <strong>Demo Login:</strong> karan@test.com <br/>
            <strong>Password:</strong> 123
          </p>
        </div>

        {/* --- SIGNUP GUIDANCE SECTION --- */}
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.5' }}>
            <strong>Naya account banana hai?</strong><br/>
            Postman use karke is endpoint par POST request bhejein: <br/>
            <code style={{ backgroundColor: '#fff3cd', padding: '2px 4px', borderRadius: '3px', fontSize: '11px', display: 'block', marginTop: '5px' }}>
              {BACKEND_URL}/api/auth/signup
            </code>
          </p>
        </div>

        <p style={{ fontSize: '11px', color: '#999', marginTop: '15px', fontStyle: 'italic' }}>
          Note: Render free tier takes 30-40s to wake up on first request.
        </p>
      </div>
    </div>
  );
}

export default App;