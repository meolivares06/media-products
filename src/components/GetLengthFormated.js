const GetLengthFormated = (seconds) => {
    /*if (value < 60)
        return value;
    if (value === 60)
        return 1;
    else if (value === 61)
        return '01:01';
    else if (value > 60) {
        let minutos = value / 60;
        if (minutos < 60)
            return `${minutos}:resto`;
    }*/


    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10) ? '0' + second : second;

    if (seconds < 60)
        return second;
    if (seconds === 60)
        return '01:00';
    if(seconds > 60 && seconds < 3600)
        return `${minute }:${second}`;
    return hour + ':' + minute + ':' + second;

}
export default GetLengthFormated;