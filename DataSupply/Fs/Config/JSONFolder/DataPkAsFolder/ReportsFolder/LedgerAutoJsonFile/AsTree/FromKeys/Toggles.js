let CommonFileData = require("../../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromData = await CommonFileData.StartFunc({ inDataPK });

    if (CommonFromData.KTF === false) {
        LocalReturnData.KReason = CommonFromData.KReason;
        return await LocalReturnData;
    };

    if (("JsonData" in CommonFromData) === false) {
        LocalReturnData.KReason = "JsonData is Not Found..!";
        return await LocalReturnData;
    };
    LocalReturnData = CommonFromData.JsonData;
    LocalReturnData.KTF = true;

    return await LocalReturnData;


};

let MockFunc = () => {
    StartFunc({
        inDataPK: 1024

    }).then((PromiseData) => {
        console.log("PromiseData--", Object.keys(PromiseData));
    });
};
// MockFunc();



module.exports = { StartFunc };