import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { convertMillisecondsToMinutesAndSeconds } from './Functions';
import SpotifyLogo from "./assets/Spotify_logo.png";
import AppleMusicLogo from "./assets/AppleMusic_logo.png";
import PlayButton from "./assets/Play_button.svg";
import StopButton from "./assets/Stop_button.svg";

export const TrackItem = ({ trackInfo, playSong, currentSongId, progress }) => {
  const handleButtonPlaySong = (url, id) => {
    playSong(url, id);
  };

  return (
    <div className='flex items-center px-6 py-3 gap-3 w-full rounded-full bg-purple-300 bg-opacity-70 border-4 border-white'>
      <div className='w-2/12 lg:w-1/12 h-auto'>
        <img src={trackInfo.album.images[0].url} alt="" className='w-full rounded-md' />
      </div>
      <div className='w-2/6 flex flex-col'>
        <p className='font-bold text-black truncate'>{trackInfo.name}</p>
        <p className='text-black truncate'>
          {trackInfo.artists.map((artist, index) => (
            <span key={artist.id}>
              {artist.name}
              {index < trackInfo.artists.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
      <div className='w-1/6 text-black'>
        <p>{convertMillisecondsToMinutesAndSeconds(trackInfo.duration_ms)}</p>
      </div>
      <div className='w-2/6 flex items-center justify-end space-x-3'>
        <button onClick={() => handleButtonPlaySong(trackInfo.preview_url, trackInfo.id)} className={`flex items-center ${!trackInfo.preview_url ? "opacity-50 cursor-not-allowed" : ""}`} disabled={!trackInfo.preview_url}>
          <CircularProgressbarWithChildren
            value={trackInfo.id === currentSongId ? progress : 0}
            className='w-12 z-10'
            styles={buildStyles({
              strokeLinecap: 'butt',
              textSize: '16px',
              pathTransitionDuration: 0.5,
              pathColor: `#000000`,
            })}
          >
            {trackInfo.id === currentSongId && trackInfo.preview_url ?  <img src={StopButton} alt="" className='w-8 ' /> : <img src={PlayButton} alt="" className='w-8 ' />}
          </CircularProgressbarWithChildren>
        </button>
        <a href={`https://music.apple.com/es/search?term=${trackInfo.name.replace(/ /g, '%20')}`}>
          <img src={AppleMusicLogo} alt="" className='w-12' />
        </a>
        <a href={trackInfo.external_urls.spotify}>
          <img src={SpotifyLogo} alt="" className='w-12' />
        </a>
      </div>
    </div>
  );
};

