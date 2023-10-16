export const convertMillisecondsToMinutesAndSeconds = (milliseconds) => {
    // Calculate minutes and seconds
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = Math.floor((milliseconds % 60000) / 1000);

    // Format seconds to ensure it has two digits
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Return the result in 'minutes:seconds' format
    return minutes + ':' + seconds;
  }