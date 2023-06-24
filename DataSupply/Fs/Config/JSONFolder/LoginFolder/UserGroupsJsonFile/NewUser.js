let CommonPullData = require("./PullDataFromFile/FromJson");
let CommonPushData = require("./PushDataToFile/NoSync");
let CommonFind = require("./Find/InJson");
let CommonUserDataJson = require("../UserDataJsonFile/Find/FindUserNameAndPassword");
let CommonMock = require("../../../../../MockAllow.json");

//let CommonUserDataJson = require("../../UserDataJson/Find/UserNameAndPassword");

const toNumbers = arr => arr.map(Number);

let GeneratePk = ({ inDataWithKey }) => {
    let LocalNewPk = 1;
    let LocalKeysArray = Object.keys(inDataWithKey);
    let LocalPkArray = toNumbers(LocalKeysArray);

    if (LocalPkArray.length > 0) {
        LocalNewPk = Math.max(...LocalPkArray) + 1;
    };

    return LocalNewPk;
};

let StartFunc = async ({ UserName, PassWord, FirmName }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let inUserName = UserName;
    let inPassWord = PassWord;
    let inFirmName = FirmName;

    try {
        let LocalFromCommonFind = CommonFind.StartFunc({ inUserName, inPassWord, inFirmName });

        LocalReturnData = { ...LocalFromCommonFind };
        LocalReturnData.KTF = false;

        if (LocalFromCommonFind.KTF) {
            return LocalReturnData;
        };

        let LocalFromCommonUserDataJson = CommonUserDataJson.StartFunc({ inUserName, inPassWord });

        LocalReturnData = { ...LocalFromCommonUserDataJson };
        LocalReturnData.KTF = false;

        if (LocalFromCommonUserDataJson.KTF === false) {
            LocalReturnData.KReason = "Not found in user file";
            return LocalReturnData;
        };

        //   let LocalUserPK = LocalFromCommonUserDataJson.kPK;
        let LocalOriginalData = CommonPullData.StartFunc();
        let LocalAlterdData = JSON.parse(JSON.stringify(LocalOriginalData.JsonData));

        let LocalUserPK = GeneratePk({ inDataWithKey: LocalAlterdData });

        LocalAlterdData[LocalUserPK] = {
            UserName: inUserName,
            PassWord: inPassWord,
            ConnectedDatas: {}
        };

        LocalAlterdData[LocalUserPK].ConnectedDatas[LocalFromCommonUserDataJson.kPK] = {
            FirmName: inFirmName
        };

        let LocalFromPush = CommonPushData.StartFunc({
            inOriginalData: LocalOriginalData.JsonData,
            inDataToUpdate: LocalAlterdData
        });

        console.log('LocalFromPush : error : ', LocalFromPush);

    } catch (error) {
        console.log('DataSupply : error : ', error);
        LocalReturnData.KReason = error;
        return await LocalReturnData;
    };

    return await LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KD25') {
        let LocalMockData = require('./NewUser.json');

        StartFunc({ ...LocalMockData }).then(PromiseData => {
            console.log("PromiseData : ", PromiseData);
        });
    };
};

module.exports = { StartFunc };