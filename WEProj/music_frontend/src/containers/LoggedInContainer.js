import { Icon } from "@iconify/react";
import spotify_logo from "../assets/images/spotify_logo_white.svg"
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { useState } from "react";
import { Howl, Howler } from "howler";
import { useContext } from "react";
import songContext from "../contexts/songContext";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const LoggedInContainer = ({children, curActiveScreen}) => {
    const [createPlaylistModalOpen, setcreatePlaylistModalOpen] = useState(false);
    const [addToPlaylistModalOpen, setaddToPlaylistModalOpen] = useState(false);

    const {currentSong, setCurrentSong, soundPlayed, setSoundPlayed , isPaused ,setisPaused} = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        //if statement will prevent useEffect from running on the first render
        if(firstUpdate.current){
            firstUpdate.current = false;
            return;
        }
        if(!currentSong){
            return;
        }
        changeSong(currentSong.track);
    }, [currentSong && currentSong.track ]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id
        const payload = {playlistId, songId}
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song", payload);
        console.log(response);
        if(response._id){
            setaddToPlaylistModalOpen(false);
        }
    };

    const playSound = () => {
        if(!soundPlayed) {
            return;
        }
        soundPlayed.play();
    }

    const changeSong = (songSrc) => {
        if(soundPlayed){
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound)
        sound.play();
        setisPaused(false);

    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if(isPaused) {
            playSound();
            setisPaused(false);
        }
        else{
            pauseSound();
            setisPaused(true);
        }

    };


    return (
        <div className="h-full w-full bg-app-black">
            {createPlaylistModalOpen && <CreatePlaylistModal closeModal ={() => {setcreatePlaylistModalOpen(false);}}/>}
            {addToPlaylistModalOpen && <AddToPlaylistModal closeModal ={() => {setaddToPlaylistModalOpen(false);}} addSongToPlaylist={addSongToPlaylist}/>}
            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
            {/*Left Panel */}
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
               <div>
                <div className="logoDiv p-6">
                    <img src={spotify_logo} alt="logo" width={125}/>
                </div>
                <div className="py-5">
                    <IconText 
                        iconName={"material-symbols:home"} 
                        displayText={"Home"}
                        active = {curActiveScreen === "home"}
                        targetLink={"/home"}/>
                    <IconText 
                        iconName={"material-symbols:search-rounded"} 
                        displayText={"Search"}
                        active = {curActiveScreen === "search"}
                        targetLink={"/search"}/>
                    <IconText 
                        iconName={"icomoon-free:books"} 
                        displayText={"Library"}
                        active = {curActiveScreen === "library"}
                        targetLink={"/library"}/>
                    <IconText 
                        iconName={"material-symbols:library-music-sharp"} 
                        displayText={"My Music"}
                        active = {curActiveScreen === "myMusic"}
                        targetLink={"/myMusic"}/>
                </div>
                <div className="pt-5">
                    <IconText 
                        iconName={"material-symbols:add-box"} 
                        displayText={"Create Playlist"}
                        onClick={()=>{setcreatePlaylistModalOpen(true);}}/> 

                    <IconText 
                        iconName={"mdi:cards-heart"} 
                        displayText={"Liked Songs"}/> 
                </div>
            </div>

                <div className="px-5">
                    <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                        <Icon icon={"mingcute:earth-2-line"} />
                        <div className="ml-2 text-sm font-semibold">English</div>
                    </div>
                </div>

            </div>
            {/*Right part */}
            <div className="h-full w-4/5 bg-app-black overflow-auto">
                <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                    <div className="w-1/2 flex h-full">
                        <div className="w-2/3 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"}/>
                            <TextWithHover displayText={"Support"}/>
                            <TextWithHover displayText={"Download"}/>
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        
                        <div className="w-1/3 flex justify-around h-full items-center">
                            <TextWithHover displayText={"Upload Song"}/>
                            <div className="bg-white h-10 w-10 px-2 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                BH
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content p-8 pt-0 overflow-auto">
                    {children}
                </div>
            </div>
            </div>
            {/* Current playing song */}
            {
                currentSong && (
            
            <div className=" w-full h-1/10 bg-black bg-opacity-30  text-white flex items-center px-4">
                <div className=" w-1/4 flex items-center">
                    <img src={currentSong.thumbnail} alt="currentSongThumbnail" className=" h-14 w-14 rounded"/>
                    <div className="pl-4">
                        <div className="text-sm hover:underline cursor-pointer">{currentSong.name}</div>
                        <div className="text-xs text-gray-500 hover:underline cursor-pointer">{currentSong.artist.firstName + " " + currentSong.artist.lastName} </div>  
                    </div>   
                </div>
                <div className="w-1/2 h-full flex justify-center flex-col items-center" >
                    <div className="flex w-1/3 justify-between items-center">
                        {/* Controls here */}
                        <Icon icon="lucide:shuffle" fontSize={30} className="cursor-pointer text-gray-400 hover:text-white"/>

                        <Icon icon="mi:previous"fontSize={30} className="cursor-pointer text-gray-400 hover:text-white"/>

                        <Icon
                            icon={isPaused?"icon-park-outline:play":"icon-park-outline:pause-one" }
                            fontSize={50} 
                            className="cursor-pointer text-gray-400 hover:text-white"
                            onClick={togglePlayPause}/>

                        <Icon icon="mi:next" fontSize={30} className="cursor-pointer text-gray-400 hover:text-white"/>

                        <Icon icon="lucide:repeat" fontSize={30} className="cursor-pointer text-gray-400 hover:text-white" />
                    </div>
                    <div>
                        {/*Progress bar here */}
                    </div>

                </div>
                <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                    <Icon 
                        icon="material-symbols:playlist-add" 
                        fontSize={30} 
                        className="cursor-pointer text-gray-400 hover:text-white"
                        onClick={()=> {
                            setaddToPlaylistModalOpen(true);
                        }}/>
                    <Icon icon="mdi:heart" fontSize={30} className="cursor-pointer text-gray-400 hover:text-white"/>
                </div>               
            </div>
        )}


        </div>
    );

};



export default LoggedInContainer;