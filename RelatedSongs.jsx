import SongBar from './SongBar';
import { useGetSongRelatedQuery } from '../redux/services/shazamCore';

const RelatedSongs = ({songId , isPlaying , activeSong , handlePauseClick
   , handlePlayClick , artistId}) => {
  const offset =0;
  const songid='554591360';
  const {data , isFetching: isFetchingRelatedSongs , error }= useGetSongRelatedQuery({songid,offset});
  console.log(data);
  return (
   <div className ="flex flex-col">
   <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
   
   <div className="mt-6 w-full flex flex-col">
    {data?.map((song,i)=> (
      <SongBar
      key={`${song.id}-${artistId}`}
      song={song}
      i={i}
      artistId={artistId}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePauseClick={handlePauseClick}
      handlePlayClick={handlePlayClick}
      
      />
    ))}
   </div>
   </div>);
 };

export default RelatedSongs;
