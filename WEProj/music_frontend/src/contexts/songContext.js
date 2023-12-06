import { createContext } from "react";

const songContext = createContext({
    currentSong:null,
    setCurrentSong:(currentSong)=> {},
    soundPlayed: null, 
    setSoundPlayed : ()=>{},
    isPaused: null, 
    setisPaused: ()=> {}
});

export default songContext;