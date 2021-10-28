import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import './App.css';

function App() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState(''); 
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});
  const notesCollectionRef = collection(db, 'users');

  const initialize = async () => {
    const data = await getDocs(notesCollectionRef);
    data.docs.map(doc => console.log(doc.data()));
  }

  const createNote = async () => {
    await addDoc(notesCollectionRef, [{ note: 'created note!', idDone: false, noteId: 'ID_999' }]);
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    initialize();
  }, []);

  const createUser = async () => {
    try {
      const createUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await setDoc(doc(db, 'users', createUser.user.uid), { text: 'yeah!' });
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
      <button onClick={createNote}>Create Note</button>
    </div>
  );
}

export default App;
