let CommonFilesPushData = require("../../../Fs/Config/Folders/Files/PushData/ToData");
let path = require("path");

let CommonFilesPullData = require("../../../Fs/Config/JSONFolder/DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/PullDataFromFile/FromFolderAndFile");

let CommonMock = require("../../../MockAllow.json");

let LocalCheckValues = ({ inPostData }) => {
    let LocalFilter = Object.values(inPostData).filter(element => {
        return typeof element === "object";
    });

    if (LocalFilter.length > 0) {
        return false;
    }

    return true;
};

let KeysOnly = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inJsonPK }) => {
    let LocalFolderName = inJsonConfig.inFolderName;
    let LocalinJsonFileName = inJsonConfig.inJsonFileName;
    let localinFileNameOnly = path.parse(LocalinJsonFileName).name;
    let LocalItemName = inItemConfig.inItemName;

    let LocalReturnObject = { KTF: false, kPK: 0 };

    try {
        let LocalUserData;

        if (inUserPK > 0) {
            LocalUserData = CommonFilesPullData.StartFunc({
                inFolderName: LocalFolderName,
                inFileNameOnly: localinFileNameOnly, inDataPK: inUserPK
            });

            LocalReturnObject = { ...LocalUserData };
            LocalReturnObject.KTF = false;

            if (LocalUserData.KTF === false) {
                return await LocalReturnObject;
            };

            if ("JsonData" in LocalUserData === false) {
                LocalReturnObject.KReason = "JsonData not found...";
                return await LocalReturnObject;
            };

            if (LocalItemName in LocalReturnObject.JsonData === false) {
                LocalReturnObject.KReason = `${LocalItemName} not found...`;
                return await LocalReturnObject;
            };

            if (inJsonPK in LocalReturnObject.JsonData[LocalItemName] === false) {
                LocalReturnObject.KReason = "JsonPk not found...";
                return await LocalReturnObject;
            };

            let LocalFromCheck = LocalCheckValues({ inPostData });
            
            if (LocalFromCheck === false) {
                LocalReturnObject.KReason = "from check values : some values are objects...";
                return await LocalReturnObject;
            };

            LocalReturnObject.JsonData[LocalItemName][inJsonPK] = {
                ...LocalReturnObject.JsonData[LocalItemName][inJsonPK],
                ...inPostData
            };

            let PromiseData = await CommonFilesPushData.AsAsync({
                inJsonConfig,
                inUserPK, inOriginalData: LocalUserData.JsonData,
                inDataToUpdate: LocalReturnObject.JsonData
            });

            if (PromiseData.KTF === true) {
                LocalReturnObject.KTF = true;
            };
        };
    } catch (error) {
        console.log("error : ", error);
    }
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K14') {
        let LocalMockData = require('./Update.json');

        KeysOnly({
            inUserPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = {
    KeysOnly
};
