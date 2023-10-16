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
    <div className='flex p-3 gap-3 bg-purple-300 bg-opacity-70 border-4 border-white w-full items-center '>
      <img src={trackInfo.album.images[0].url} alt="" className='w-[6vh] md:w-[9vh] h-auto rounded-md' />
      <div className=' flex flex-col w-[10vh]  flex-grow'>
        <p className='font-bold text-black truncate text-xs md:text-base'>{trackInfo.name}</p>
        <p className='text-black truncate text-xs '>
          {trackInfo.artists.map((artist, index) => (
            <span key={artist.id}>
              {artist.name}
              {index < trackInfo.artists.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
      <div className=' text-black w-[3vh]'>
        <p>{convertMillisecondsToMinutesAndSeconds(trackInfo.duration_ms)}</p>
      </div>
      <div className='flex items-center justify-end gap-1'>
        <button onClick={() => handleButtonPlaySong(trackInfo.preview_url, trackInfo.id)} className={`flex items-center scale-75 ${!trackInfo.preview_url ? "opacity-50 cursor-not-allowed" : ""}`} disabled={!trackInfo.preview_url}>
          <CircularProgressbarWithChildren
            value={trackInfo.id === currentSongId ? progress : 0}
            className='w-12 z-10'
            strokeWidth={10}
            styles={buildStyles({
              strokeLinecap: 'butt',
              textSize: '16px',
              pathTransitionDuration: 0.5,
              pathColor: `#000000`,
            })}
          >
            {trackInfo.id === currentSongId && trackInfo.preview_url ? <img src={StopButton} alt="" className='w-[5vh] h-auto' /> : <img src={PlayButton} alt="" className='w-[5vh] h-auto' />}
          </CircularProgressbarWithChildren>
        </button>
          <a href={`https://music.apple.com/es/search?term=${trackInfo.name.replace(/ /g, '%20')}`} target="_blank">
            <img src={AppleMusicLogo} alt="" className='w-[4vh] md:w-[3vh] h-auto' />
          </a>
          <a href={trackInfo.external_urls.spotify} target="_blank">
            <img src={SpotifyLogo} alt="" className='w-[4vh] md:w-[3vh] h-auto' />
          </a>
      </div>
    </div>
  );
};

