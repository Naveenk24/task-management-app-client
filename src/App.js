import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/index';
import Signup from './components/Signup/index';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="bg-container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// #f0e5f2
// #f0e5f2

//background-image: url("https://img.freepik.com/free-vector/abstract-background-design-with-stars-blue_53876-59272.jpg?t=st=1720522426~exp=1720526026~hmac=e16cbbb05dccf7b706d4097a312eb510802bb075c0441041e080773b19fe73df&w=740");
