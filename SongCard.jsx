import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  //console.log(song);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  

  const isCurrentSong = activeSong?.attributes?.albumName === song.attributes?.albumName;
  
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 
      bg-opacity-80 backdrop-blur-sm animate-slideup
      rounded-lg cursor-pointer">
      
      <div className="relative w-full h-56 group">
        <img
          alt="song_img"
          src={song.attributes?.artwork?.url
            ?.replace('{w}', '250')
            ?.replace('{h}', '250')}
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Overlay for Play/Pause */}
        <div
          className={`absolute inset-0 z-10 justify-center items-center transition duration-300 rounded-lg
            ${isCurrentSong
              ? 'flex bg-black bg-opacity-50'
              : 'hidden group-hover:flex group-hover:bg-black group-hover:bg-opacity-50'}
          `}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`}>
            {song.attributes.albumName}
          </Link>
        </p>
        <p className="font-semibold text-[1.1rem] text-gray-400 truncate">
          <Link to={
            song.relationships?.artists?.data?.[0]?.id
              ? `/artists/${song.relationships.artists.data[0].id}`
              : '/top-artists'
          }>
            {song.attributes.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
