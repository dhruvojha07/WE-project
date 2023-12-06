import LoggedInContainer from "../containers/LoggedInContainer";

const HitsCardsData = [ 
    {
        title:"Mega Hit Mix",
        description:"A mega mix of 75 favorites from the last few years!",
        imgUrl:"https://pbs.twimg.com/media/FxIEZ9xWIAApLlY.jpg"
    }, 
    {
        title:"Today's Top Hits" ,
        description:"Jack Harlow is on top of the Hottest 50!",
        imgUrl:"https://images.squarespace-cdn.com/content/v1/5fd953e5e5517503cf76c906/1620969143796-JSF8VWCP8RGQXTTBOEC0/tth+weeknd.jpeg?format=1000w"
    }, 
    {
        title:"teen beats",
        description:"may the odds be forever in tom blyth's favor",
        imgUrl:"https://i.scdn.co/image/ab67706f00000002506dd2a6f5c99fadac03c4b7"
    }, 
    {
        title:"Chill Hits", 
        description:"Kick back to the best new and recent chill hits.",
        imgUrl:"https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe"
    }, 
    {
        title:"Pop Rising",
        description:"Who's now and next in pop.Cover:Paul Russell",
        imgUrl:"https://i.scdn.co/image/ab67706f00000002dc2c5abb17b557194993f080"
    }];

const focusCardsData = [ 
    {
        title:"Deep Focus",
        description:"Keep calm and focus with ambient and post-rock music.",
        imgUrl:"https://i.scdn.co/image/ab67706f00000002d6d48b11fd3b11da654c3519"
    }, 
    {
        title:"lofi beats" ,
        description:"chill beats, lofi vibes, new tracks every week...",
        imgUrl:"https://i.scdn.co/image/ab67706f0000000254473de875fea0fd19d39037"
    }, 
    {
        title:"homework vibes",
        description:"some bops to take the pain of homework away.",
        imgUrl:"https://i.scdn.co/image/ab67706f0000000264a2f100351022f13e2f8fa1"
    }, 
    {
        title:" Focus Jazz", 
        description:"Soft instrumental jazz for working or studying.",
        imgUrl:"https://i.scdn.co/image/ab67706f00000002f81d0bfb30b2aa84cb3f9c27"
    }, 
    {
        title:"Perfect Concentration",
        description:"Calm piano music for enhanced concentration.",
        imgUrl:"https://i.scdn.co/image/ab67706f000000023e96a943bf36e2a5895e4d8b"
    }];

const popCardsData = [
    {
        title:"Girls' Night",
        description:"It's all about the girls tonight.",
        imgUrl:"https://i.scdn.co/image/ab67706f00000002d3a0894b5ce105311d8479cd"
    }, 
    {
        title:"Pop Party" ,
        description:"A perfect little pop party.",
        imgUrl:"https://i.scdn.co/image/ab67706f000000020326a92ce25b60530fe4dfbd"
    }, 
    {
        title:"Espresso Martini",
        description:"Songs to make you run,not walk, to the dancefloor",
        imgUrl:"https://i.scdn.co/image/ab67706f000000026bae1a07b1cd55a7d744fc4d"
    }, 
    {
        title:" 80s Party", 
        description:"The biggest party hits of the 1980s",
        imgUrl:"https://i.scdn.co/image/ab67706f00000002ce0d719711be7c0832daf3cd"
    }, 
    {
        title:"Dance Pop Hits",
        description:"Hit the dancefloor with your favourite bops!",
        imgUrl:"https://i.scdn.co/image/ab67706f000000021deebf75d5abd0f11a3cea52"
    }];
      
const HomeComponent = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
            <PlaylistView titleText="Today's Biggest Hits" cardsData={HitsCardsData}/>
            <PlaylistView titleText="Focus"cardsData={focusCardsData}/>
            <PlaylistView titleText="Pop Party"cardsData={popCardsData}/>
        </LoggedInContainer>

    );
};

const PlaylistView = ({titleText, cardsData}) => {
    return(
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full flex justify-between space-x-4">
                {
                    //cardsData will be an Array
                    cardsData.map(item=>{
                       return (
                       <Card 
                            title={item.title} 
                            description={item.description} 
                            imgUrl={item.imgUrl}
                            /> 
                       );
                    })
                }
           
            </div>
        </div>
    )
};

const Card = ({title, description, imgUrl}) =>{
    return(
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md"
                src={imgUrl}
                alt="label"/>
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    )
};


export default HomeComponent;