const transform = (value) => {

    if (!value)
        return '';

    let arrTemp = value.split(' ');
    if (arrTemp.length === 1)
        return arrTemp[0].slice(0, 3).toUpperCase();
    else if (arrTemp.length === 2) {
        //agarro del primero los dos caracteres
        const uno = arrTemp[0];
        const dos = arrTemp[1];
        const unoAbbr = uno.slice(0, 2).toUpperCase();
        const dosAbbr = dos.slice(0, 1).toUpperCase();
        return unoAbbr + dosAbbr;
    } else if (arrTemp.length >= 3) {

        let abbr = '';
        arrTemp.forEach((value, index) => {
            const valueAbbr = value.slice(0, 1).toUpperCase();
            abbr += valueAbbr;
        })
        return abbr;
    }
}

const GetAbbreviation = (value) => transform(value);

export default GetAbbreviation;