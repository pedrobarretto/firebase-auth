import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

function App() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState(''); 
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          value={registerEmail}
          onChange={event => setRegisterEmail(event.target.value)}
          placeholder="Email..."
        />
        <input
          value={registerPassword}
          onChange={event => setRegisterPassword(event.target.value)}
          placeholder="Password..."
        />

        <button onClick={createUser} >Create User</button>
      </div>

      <div>
        <h3>Login</h3>
        <input
          value={loginEmail}
          onChange={event => setLoginEmail(event.target.value)}
          placeholder="Email..."
        />
        <input
          value={loginPassword}
          onChange={event => setLoginPassword(event.target.value)}
          placeholder="Password..."
        />

        <button onClick={handleLogin}>Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}

export default App;
