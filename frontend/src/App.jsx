import { useState } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/config';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';


function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} />} />
        <Route path="/home" element={user ? <Home /> : <SignIn setUser={setUser}/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
