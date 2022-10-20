let CommonPullData = require("../../../../../DataSupply/Fs/LoginFolder/UserDataJson/PullData/FromFile");
let CommonPushData = require("../../../../../DataSupply/Fs/LoginFolder/UserDataJson/PushData/ToJsonFile");

let StartFunc = async ({ inUserName, inPassword }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromfileData = await CommonPullData.StartFunc();

    if (LocalFromfileData.KTF) {
        if ("JsonData" in LocalFromfileData) {
            let LocalToBeInsertedData = JSON.parse(JSON.stringify(LocalFromfileData.JsonData));

            if ("data" in LocalToBeInsertedData) {
                var StringArray = Object.keys(LocalToBeInsertedData.data);
                var NumericArray = StringArray.map(Number);
                //const maxNum = Math.max(...NumericArray).toString();
                const maxNum = Math.max(...NumericArray)

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
                    };
                }
            };
        }
    };

    return await LocalReturnData;

};

module.exports = { StartFunc };