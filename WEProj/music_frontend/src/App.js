import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from './routes/Login';
import './output.css';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';

function App() {
  return (
    <div className="App">
      <div className="w-screen h-screen font-poppins">
        <BrowserRouter>
          <Routes>
            <Route path ="/login" element={<LoginComponent />}/>
            <Route path ="/signup" element={<SignupComponent />}/>
            <Route path ="/home" element={<HomeComponent />}/>
            <Route path ="/ " element={<div></div>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
