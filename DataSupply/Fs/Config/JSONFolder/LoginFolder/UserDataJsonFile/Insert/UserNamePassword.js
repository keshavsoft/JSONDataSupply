let CommonPullData = require("../PullDataFromFile/FromJson");
let CommonPushData = require("../PushDataToFile/ToJsonFile");
let CommonMock = require("../../../../../../MockAllow.json");

let StartFunc = ({ inUserName, inPassword }) => {
    let LocalPullData = CommonPullData.StartFunc();

    let LocalReturnObject = { ...LocalPullData };
    LocalReturnObject.KTF = false;

    if (LocalPullData.KTF === false) {
        delete LocalReturnObject.JsonData;
        return LocalReturnObject;
    };

    if (inUserName === "" || inPassword === "") {
        return LocalReturnObject;
    };

    if (LocalFuncUserNameNotFound({ inUserName, inJsonData: LocalReturnObject.JsonData.data }) === false) {
        LocalReturnObject.UserNameFound = true;
        return LocalReturnObject;
    };

    let localArray = Object.keys(LocalReturnObject.JsonData.data);
    let numberArray = localArray.map(Number);
    let localMaxNumber = Math.max(...numberArray, 0) + 1;

    LocalReturnObject.JsonData.data[localMaxNumber] = {}
    LocalReturnObject.JsonData.data[localMaxNumber].UserName = inUserName;
    LocalReturnObject.JsonData.data[localMaxNumber].PassWord = inPassword;

    let localPushData = CommonPushData.StartFunc({
        inOriginalData: LocalPullData.JsonData,
        inDataToUpdate: LocalReturnObject.JsonData
    });

    if (localPushData.KTF) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.NewDataPk = localMaxNumber;
        delete LocalReturnObject.JsonData;
    };

    return LocalReturnObject;
};

const LocalFuncUserNameNotFound = ({ inUserName, inJsonData }) => {
    let localValue = Object.values(inJsonData);

    const result = localValue.find(({ UserName }) => UserName === inUserName);

    if (result === undefined) {
        return true;
    };

    return false;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === '88') {
        let LocalMockData = require('./UserNamePassword.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };