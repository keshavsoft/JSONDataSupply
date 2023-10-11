const StartFunc = ({ inDataToInsert }) => {

    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();
    let retunData = { ...inDataToInsert, DateTime: formattedDate };


    return retunData;

};

module.exports = { StartFunc }