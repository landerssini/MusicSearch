import { useEffect, useRef, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { getSongs, getTokenSpotify } from './API/API'
import { TrackItem } from './TrackItem';
import logo from "./assets/Logo.png"
import './App.css'

export const App = () => {
  const [searchInput, setSearchInput] = useState("")
  const [BearerKey, setBearerKey] = useState()
  const [results, setResults] = useState([])
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [searching, setSearching] = useState(false);


  const playSong = (url, id) => {
    if (currentSongId === id) {
      setCurrentSong(null);
      setCurrentSongId(null)
    } else {
      setCurrentSong(null);
      setCurrentSongId(id)
      setTimeout(() => {
        setCurrentSong(url);
      }, 0);
    }
  };

  useEffect(() => {
    setProgress(0);

    let audio = new Audio(currentSong);

    const updateProgress = () => {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(newProgress);
    };

    const handleSongEnd = () => {
      setProgress(0);
      setCurrentSong()
      setCurrentSongId(null)
    };

    if (currentSong) {
      audio.play();
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleSongEnd);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleSongEnd);
        audio.pause();
      };
    } else {

      audio.pause();
      setProgress(0);
    }
  }, [currentSong]);



  useEffect(() => {
    if (!BearerKey) {
      const LocalStorageDataSearchMusic = JSON.parse(localStorage.getItem("SearchMusic"))
      if (LocalStorageDataSearchMusic) {
        console.log(LocalStorageDataSearchMusic);
        if (LocalStorageDataSearchMusic.now <= Date.now() - 3500000) {
          getBearer()
        } else {
          setBearerKey(LocalStorageDataSearchMusic.Bearer)
        }
      } else {
        getBearer()
      }
    }
  }, [])


  const getBearer = async () => {
    const response = await getTokenSpotify()
    setBearerKey(response);
    const now = Date.now()
    const data = {
      Bearer: response,
      now
    }
    localStorage.setItem("SearchMusic", JSON.stringify(data))
  }

  const timeoutIdRef = useRef(null)

  useEffect(() => {

    setProgress(0)
    setCurrentSong()
    clearTimeout(timeoutIdRef.current);

    if (searchInput.length >= 3) {
      setSearching(true)
      timeoutIdRef.current = setTimeout(async () => {
        const data = await getSongs(searchInput, BearerKey);
        setResults(data.tracks.items);
        setSearching(false)
      }, 1000);
    } else {
      setResults([]);
      setSearching(false)
    }
  }, [searchInput]);

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value)
  }
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center gap-5 bg-[url('./assets/bg.png')] bg-cover">
        <img src={logo} alt="" className='w-[25vh]' />
        <div className=' p-2 w-full flex flex-col items-center gap-5'>
          <div >
            <div className="relative flex items-center w-full rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="py-4 w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search a song..."
                value={searchInput}
                onChange={(e) => handleChangeSearchInput(e)} />
            </div>
          </div>
          <div className='flex flex-col gap-3 overflow-auto h-[61vh] w-full xl:w-2/5 items-center p-2 '>
            {results.length > 0 && !searching ?
              results.map((result, index) =>
                <TrackItem trackInfo={result} key={index} playSong={playSong} currentSongId={currentSongId} progress={progress} />
              )
              : searching ?
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#552c86"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                /> :
                <p>Try to search something 😊🥳 Search with at least 3 characters</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

