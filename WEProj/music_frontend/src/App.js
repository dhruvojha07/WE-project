import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './routes/Login';
import './output.css';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import LoggedInHomeComponent from './routes/LoggedInHome';
import UploadSong from './routes/UploadSong';
import MyMusic from './routes/MyMusic';
import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';
import { useState } from 'react';

function App() {
  const [currentSong, setCurrentSong] = useState(null)
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setisPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);
  console.log(cookie.token);
  return (
    <div className="App">
      <div className="w-screen h-screen font-poppins">
        <BrowserRouter>
          {cookie.token ? (
            //LOGGED IN
            <songContext.Provider value={{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setisPaused}}>
              <Routes>
              <Route path ="/home" element={<LoggedInHomeComponent />}/>
              <Route path ="/uploadsong" element={<UploadSong/>}/>
              <Route path ="/myMusic" element={<MyMusic/>}/>
              <Route path= "*" element={<Navigate to="/home"/> }/>              
            </Routes>
            </songContext.Provider>
            
          ) : (
            //LOGGED OUT
            <Routes>
              <Route path ="/login" element={<LoginComponent />}/>
              <Route path ="/signup" element={<SignupComponent />}/>
              <Route path ="/home" element={<HomeComponent />}/>
              <Route path= "*" element={<Navigate to="/login"/> }/>

            </Routes>
          )}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
