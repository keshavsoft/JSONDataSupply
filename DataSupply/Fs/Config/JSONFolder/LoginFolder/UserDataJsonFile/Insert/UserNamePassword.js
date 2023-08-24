let CommonPullData = require("../PullDataFromFile/FromJson");
let CommonPushData = require("../PushDataToFile/ToJsonFile");
let CommonMock = require("../../../../../../MockAllow.json");

let StartFunc = ({ inUserName, inPassword }) => {
    let LocalPullData = CommonPullData.StartFunc();

    let LocalReturnObject = { ...LocalPullData };
    LocalReturnObject.KTF = false;

    if (LocalPullData.KTF === false) {
        return LocalReturnObject;
    };
    let localArray = Object.keys(LocalReturnObject.JsonData.data);
    let numberArray = localArray.map(Number);
    let localMaxNumber = Math.max(...numberArray) + 1;

    LocalReturnObject.JsonData.data[localMaxNumber] = {}
    LocalReturnObject.JsonData.data[localMaxNumber].UserName = inUserName;
    LocalReturnObject.JsonData.data[localMaxNumber].PassWord = inPassword;

    let localPushData = CommonPushData.StartFunc({
        inOriginalData: LocalPullData.JsonData,
        inDataToUpdate: LocalReturnObject.JsonData
    });
    if (localPushData.KTF) {
        LocalReturnObject.KTF
    };

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === '55') {
        let LocalMockData = require('./UserNamePassword.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };