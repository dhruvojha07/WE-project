import spotify_logo from "../assets/images/spotify_logo_white.svg"
import IconText from "../components/shared/IconText";

const HomeComponent = () => {
    return (
        <div className="h-full w-full flex">
            {/*Left Panel */}
            <div className="h-full w-1/5 bg-black">
                <div className="logoDiv p-6">
                    <img src={spotify_logo} alt="logo" width={125}/>
                </div>
                <div>
                    <IconText 
                        iconName={"material-symbols:home"} 
                        displayText={"Home"}
                        active/>
                    <IconText 
                        iconName={"material-symbols:search-rounded"} 
                        displayText={"Search"}/>
                    <IconText 
                        iconName={"icomoon-free:books"} 
                        displayText={"Library"}/>
                </div>

            </div>
            {/*Right part */}
            <div className="h-full">

            </div>

        </div>
    );

};

export default HomeComponent;