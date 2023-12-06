
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

const  MyMusic = () => {
    const [songData, setSongData] = useState([]);
    
    useEffect (() => {
        
        //Cant use async with useEffect so we make another async function inside it for the GET request
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
            setSongData(response.data);
            
        };
        getData();
    }, []);
    
    return (
        <LoggedInContainer curActiveScreen="myMusic">
            <div className="text-white text-xl pb-4 pl-2 pt-8 font-semibold">
                        My Songs
                    </div>
                    <div className="space-y-3 overflow-auto">
                        {songData.map((item) => {
                            return <SingleSongCard 
                                        info ={item}
                                        playSound={() => {}}/>
                        })}
                    </div>
        </LoggedInContainer>
    );

};


export default MyMusic;