import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  // Get the first key from shazam-songs dynamically
  const shazamSongs = songData?.resources?.['shazam-songs'];
  const firstSongKey = shazamSongs ? Object.keys(shazamSongs)[0] : null;
  const coverArt = firstSongKey ? shazamSongs[firstSongKey]?.attributes?.images?.coverArt : null;

  const artistid = Object.keys(songData?.resources?.artists || {})[0];
  const artistName = artistid ? songData.resources.artists[artistid]?.attributes?.name : "Unknown Artist";
  
  const songId = Object.keys(songData?.resources?.songs || {})[0];
  const songTitle = firstSongKey 
  ? shazamSongs[firstSongKey]?.attributes?.title 
  : "Unknown Song";

  const songResources = songData?.resources?.songs;
const firstSongKey2 = songResources ? Object.keys(songResources)[0] : null;

const unitags = firstSongKey2 ? songResources[firstSongKey2]?.attributes?.unitags : [];
const genres = unitags
  .filter(tag => tag.namespace === "EditorialGenres")
  .map(tag => tag.tag).join(", ");





  return (
    <div className="relative w-full flex flex-col">
      {/* Background gradient */}
      <div className="relative w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-60 flex items-center justify-center" />

      {/* Album Art */}
      <div className="absolute inset-0 flex items-center">
        {coverArt && (
          <img
            src={coverArt}
            alt="Cover Art"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-white bg-white ml-4 shadow-lg"
          />
        )}
        <div className="ml-5 text-white">
          <p className="font-bold sm:text-3xl text-xl
          text-white">{songTitle}</p>
         {!artistId && (
  <Link to={`/artists/${songData?.resources?.artists && Object.values(songData.resources.artists)[0]?.id}`}>
    <p className="text-gray-400 text-lg font-bold mt-2">
      {Object.values(songData?.resources?.artists || {})[0]?.attributes?.name || "Unknown Artist"}
    </p>
  </Link>
)}
    <p className="text-base text-gray-400 mt-2">
    {genres}
    </p>

        </div>
      </div>
      <div className="w-full sm:h-10 h-24"/>
    </div>
  );
};

export default DetailsHeader;
