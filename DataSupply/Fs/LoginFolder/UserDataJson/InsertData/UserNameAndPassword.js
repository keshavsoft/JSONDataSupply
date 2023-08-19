let CommonPullData = require("../../../../../DataSupply/Fs/LoginFolder/UserDataJson/PullData/FromFile");
let CommonPushData = require("../../../../../DataSupply/Fs/LoginFolder/UserDataJson/PushData/ToJsonFile");
const toNumbers = arr => arr.map(Number);

let CommonMock = require("../../../../MockAllow.json");

let StartFunc = async ({ inUserName, inPassword }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromfileData = await CommonPullData.StartFunc();

    LocalReturnData = { ...LocalFromfileData };
    LocalReturnData.KTF = false;

    if (LocalFromfileData.KTF === false) {
        LocalReturnData.ErrorFrom = "CommonPullData";
        return LocalReturnData;
    };

    if ("JsonData" in LocalFromfileData) {
        let LocalToBeInsertedData = JSON.parse(JSON.stringify(LocalFromfileData.JsonData));

        if ("data" in LocalToBeInsertedData) {
            var StringArray = Object.keys(LocalToBeInsertedData.data);
            let maxNum = 0;

            if (StringArray.length > 0) {

                var NumericArray = toNumbers(StringArray);

                maxNum = Math.max(...NumericArray);
            };

            if ((maxNum + 1 in LocalToBeInsertedData.data) === false) {
                LocalToBeInsertedData.data[maxNum + 1] = {
                    UserName: inUserName,
                    PassWord: inPassword
                };
            };

            if (Object.keys(LocalToBeInsertedData.data).length > Object.keys(LocalFromfileData.JsonData.data).length) {
                let LocalFromUpdate = await CommonPushData.StartFunc({
                    inOriginalData: LocalFromfileData.JsonData,
                    inDataToUpdate: LocalToBeInsertedData
                });

                if (LocalFromUpdate.KTF) {
                    LocalReturnData.KTF = true;
                    LocalReturnData.kPK = maxNum + 1;
                };
            }
        };
    };

    return await LocalReturnData;

};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K19') {
        let LocalMockData = require('./UserNameAndPassword.json');

        StartFunc({
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);
        });
    };
};

module.exports = { StartFunc };