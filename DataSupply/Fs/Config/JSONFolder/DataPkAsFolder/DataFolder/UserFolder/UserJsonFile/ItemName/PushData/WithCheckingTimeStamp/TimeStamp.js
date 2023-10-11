const StartFunc = ({ inDataToInsert }) => {

    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();
    let retunData = { DateTime: formattedDate, ...inDataToInsert };


    return retunData;

};

module.exports = { StartFunc }