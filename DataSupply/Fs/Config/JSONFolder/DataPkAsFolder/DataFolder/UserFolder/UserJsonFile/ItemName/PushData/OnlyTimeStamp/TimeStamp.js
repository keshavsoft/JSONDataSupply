const StartFunc = () => {

    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();
    let retunData = { DateTime: formattedDate };


    return retunData;

};

module.exports = { StartFunc }