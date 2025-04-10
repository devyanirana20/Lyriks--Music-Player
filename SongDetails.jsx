import { useParams } from 'react-router-dom';
import {useSelector ,useDispatch} from 'react-redux';
import {DetailsHeader ,Error , Loader , RelatedSongs} from '../components';

import {setActiveSong ,playPause} from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
import { useGetSongRelatedQuery } from '../redux/services/shazamCore';
function ExtractLyrics(data) {
    if (!data?.resources?.lyrics) {
      return "Lyrics not available";
    }
  
    const lyricsEntries = data.resources.lyrics;
    const firstLyricsKey = Object.keys(lyricsEntries)[0];
    const textArray = lyricsEntries[firstLyricsKey]?.attributes?.text;
  
    if (!textArray || !Array.isArray(textArray)) {
      return "Lyrics not available";
    }
  
    return textArray.join("\n");
  }
  

const SongDetails =() =>{

    const  dispatch = useDispatch();
    const  {songid} = useParams();
    const {activeSong , isPlaying}= useSelector((state) => state.player);
    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid});
    //console.log(songData);
    const song_lyrics=ExtractLyrics(songData);

    console.log(song_lyrics);
    const offset=0;

    const handlePauseClick = () => {
        dispatch(playPause(false));
      };
    
      const handlePlayClick = (song,i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
      };

    return ( <div className="flex flex-col">
         <DetailsHeader artistId={undefined} songData={songData}/>
     
    <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
    
    <div className="mt-5 text-gray-400">
    {song_lyrics  != "Lyrics not available" ?<pre className="whitespace-pre-wrap">
  {song_lyrics}
</pre> : 
    <p>Sorry, no lyrics found !</p>}
    </div>
    </div>
    <RelatedSongs 
     songId={songid}
     isPlaying={isPlaying}
     activeSong={activeSong}
     handlePauseClick={handlePauseClick}
     handlePlayClick={handlePlayClick}
     />
    </div>
    );

};



export default SongDetails;
