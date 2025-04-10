import {useEffect , useRef} from 'react';
import {Link} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import {Swiper , SwiperSlide} from 'swiper/react';
import SwiperCore, { FreeMode } from 'swiper';  // ✅ Import FreeMode and SwiperCore

SwiperCore.use([FreeMode]);





import 'swiper/css';
import 'swiper/css/free-mode';

import PlayPause from './PlayPause';
import {playPause , setActiveSong} from '../redux/features/playerSlice';



import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import 'swiper/css';
import 'swiper/css/free-mode'; 



//we wont be passing an empty array because we want it to scroll up everytime we reload 
//because empty dependency array means it will run only when the component mounts 

const TopChartCard = ({ song, i,isPlaying,activeSong,handlePauseClick,handlePlayClick }) => (
  <div className="w-full flex items-center hover:bg-[#4c426e] py-1 px-2 rounded-lg cursor-pointer mb-1">
    <h3 className="font-bold text-sm text-white mr-2">{i + 1}</h3>
    <div className="flex-1 flex items-center space-x-2">
      <img
        className="rounded-md"
        src={song?.attributes?.artwork?.url
          ?.replace('{w}', '40')
          ?.replace('{h}', '40')}
        alt={song.attributes.albumName}
        width={40}
        height={40}
      />
      <div className="flex flex-col">
      <Link to={`/songs/${song.id}`}>
        <p className="text-white text-sm font-semibold truncate">
          {song.attributes.name}
        </p>
        </Link>
        <Link to={ `/artists/${song.relationships.artists.data[0].id}`}>
        <p className="text-gray-400 text-xs truncate">
          {song.attributes.artistName}
        </p>
        </Link>
      </div>
     
    </div>
    <PlayPause isPlaying={isPlaying}
       activeSong={activeSong}
       song={song}
       handlePause={handlePauseClick}
       handlePlay={()=>handlePlayClick(song,i)}/>
  </div>
);



const TopPlay = () => {
 
    const dispatch = useDispatch();
    const {activeSong , isPlaying} = useSelector((state) => state.player);

    const {data}= useGetTopChartsQuery();
    const divRef = useRef(null);

  useEffect(()=> {
    divRef.current.scrollIntoView({behavior: 'smooth'})},[data]);


    const topPlays = data?.slice(0,5); //Top 5 plays 

      const handlePauseClick = () => {
        dispatch(playPause(false));
      };
    
      const handlePlayClick = (song,i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
      };

    return (
          <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6
           flex-1 xl:max-w-[500px] max-w-full flex flex-col">
          <div className ="w-full flex flex-col">
           <div className="flex flex-row justify-between items-center">
           <h2 className = "text-white font-bold text-2xl mt-8">Top Charts</h2>
           <Link to ="/top-charts">
           <p className ="text-gray-300 text-base cursor-pointer mt-8">See more</p>
           </Link>
           </div>
           <div className="mt-4 flex flex-col gap-1">
            {topPlays?.map((song,i)=>(
              <TopChartCard
              key ={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}/>)
            )} 

           </div>
          </div>
          <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
           <h2 className = "text-white font-bold text-2xl">Top Artists</h2>
           <Link to ="/top-artists">
           <p className ="text-gray-300 text-base cursor-pointer">See more</p>
           </Link>
           </div>
           <Swiper slidesPerView ="auto"
           spaceBetween={15}
           freeMode ={true}
           centeredSlides
           centeredSlidesBounds
           modules={[FreeMode]}
           className="mt-4"
           >
            {topPlays ?.map((song,i) =>
              
              <SwiperSlide
                key={song?.id}
                style={{width:'25%' , height: 'auto'}}
                className ="shadow-lg rounded-full animate-slideright">
              <Link to={ `/artists/${song.relationships.artists.data[0].id}`}>
              <img 
  src={song?.attributes?.artwork?.url
    ?.replace('{w}', '64')
    ?.replace('{h}', '64')} 
  
  alt={song?.attributes?.artistName}
  className="rounded-full w-40 h-40 object-cover"
/>
              
              </Link>
              </SwiperSlide>
            
            )}

           </Swiper>

          </div>

          </div>
    );
};

export default TopPlay;
