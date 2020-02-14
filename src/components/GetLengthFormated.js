const GetLengthFormated = seconds => {
  try{

    if(undefined === seconds || null === seconds || '' === seconds)return '';
    seconds = parseInt(seconds);
    let hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    let minute = Math.floor((seconds / 60) % 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = seconds % 60;
    second = second < 10 ? "0" + second : second;

    if (seconds < 60) return second;
    if (seconds === 60) return "01:00";
    if (seconds > 60 && seconds < 3600) return `${minute}:${second}`;
    return hour + ":" + minute + ":" + second;
  }catch(error) {
    console.log(error);
  }
};
export default GetLengthFormated;
