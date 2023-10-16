
# MusicSearch

This project is an interactive music player that allows users to search for songs using the Spotify API, play, pause, and track the song's progress. The application displays details such as the song name, artists, and duration. Users can explore new music and enjoy their favorite tunes in an easy and enjoyable way.




## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Features

- Song search on Spotify.
- Play and pause functionality.
- Visualization of the song's progress.
- Integration with Apple Music and Spotify to access full-length songs.


## Tech Stack

- React.js for building the user interface.
- Spotify API for searching and playing songs.
- React Circular Progressbar for visually displaying the song's progress.


# Lessons
## Explanation of Apple Music Button

As you can see in the provided code, the Apple Music button serves as a workaround to access Apple Music's content without utilizing the official Apple Music API. The reason for this approach is that accessing the Apple Music API requires developer credentials, which typically involve a paid membership to the Apple Developer Program. As a result, to avoid these costs and enable users to explore songs on Apple Music, the application constructs a custom search URL based on the song's name.

Here's the relevant code snippet:

```javascript
<a href={`https://music.apple.com/es/search?term=${trackInfo.name.replace(/ /g, '%20')}`}>
  <img src={AppleMusicLogo} alt="" className='w-12' />
</a>
```

When users click the Apple Music button, the application generates a search link containing the song's name as a search term. By constructing this link, users can still explore and enjoy the song on Apple Music without the need for developer credentials. Please note that this method provides a limited interaction with Apple Music's content compared to a fully integrated API solution.ﬁ

## The getTokenSpotify Function

In this application, managing access tokens for interacting with the Spotify API is crucial. To handle this, the code utilizes the useEffect hook and a helper function getBearer().


### useEffect for Token Management:
```javascript
useEffect(() => {
  if (!BearerKey) {
    const LocalStorageDataSearchMusic = JSON.parse(localStorage.getItem("SearchMusic"))
    if (LocalStorageDataSearchMusic) {
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

```
This useEffect runs on component mount and checks if there's an existing BearerKey (access token).

It looks into the local storage for a stored token ("SearchMusic" key) and checks if it's still valid (within the last 58 minutes). If valid, it uses the stored token. If not, it calls getBearer() to fetch a new token.
### getBearer Function:
```javascript
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

```
The getBearer() function fetches a new access token from the Spotify API using getTokenSpotify().

It updates the BearerKey state with the new token and stores this token along with the current timestamp in the local storage. This stored data ensures persistence across page reloads and browser sessions.


This setup ensures the application always has a valid Spotify API access token. If there's no existing token or the stored token has expired, the application fetches a new one. The obtained token is not only used for the current session but also persisted in the local storage, allowing users to seamlessly interact with the Spotify API even after page reloads or when returning to the application later. This mechanism guarantees uninterrupted and smooth user experience while accessing and playing music from Spotify.

## Playback and Pause Functionality

Inside the TrackItem component, the handleButtonPlaySong function is responsible for controlling song playback and pause when the play (PlayButton) or pause (StopButton) buttons are clicked. It utilizes the currentSong state to determine which song is currently playing.

## Song Progress Update

The useEffect in the main component (App.js) manages updating the song's progress. It utilizes the timeupdate event of the Audio element to calculate the progress percentage and updates the progress state. When a song finishes playing (ended), the progress resets to zero.