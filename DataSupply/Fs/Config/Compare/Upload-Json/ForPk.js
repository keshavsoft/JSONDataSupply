let CommonJSONUploadFolder = require("../../JSONUploadFolder/UserFolders/PullFolders/getDirectories");
let CommonJSONFolder = require("../../JSONFolder/UserFolders/PullFolders/getDirectories");
let CommonLoginFolder = require("../../JSONFolder/LoginFolder/UserDataJsonFile/PullDataFromFile/FromJson");
let CommonMockAllow = require("../../../../MockAllow.json");

let StartFunc = () => {
    let LocaFromCommonJSONUploadFolder = CommonJSONUploadFolder.StartFunc();
    let LocaCommonJSONFolder = CommonJSONFolder.StartFunc();
    let LocalReturnData = {};
    LocalReturnData.FolderData = {};
    LocalReturnData.KTF = true;

    let LocalFromCommonLoginFolder = CommonLoginFolder.StartFunc();

    LocalReturnData = { ...LocalFromCommonLoginFolder };

    if (LocalFromCommonLoginFolder.KTF === false) {
        return LocalReturnData;
    };

    let LoopInsideObject = {};

    LocaFromCommonJSONUploadFolder.forEach(element => {
        LoopInsideObject[element] = {};

        LoopInsideObject[element].JsonPk = element;
        LoopInsideObject[element].DataMissing = false;

        let LocalFilteredArray = LocaFromCommonJSONUploadFolder.filter(element => LocaCommonJSONFolder.includes(element));

        if (LocalFilteredArray.length === 0) {
            LoopInsideObject[element].DataMissing = true;
        };

        if (element in LocalFromCommonLoginFolder.JsonData) {
            LoopInsideObject[element].UserName = LocalFromCommonLoginFolder.JsonData[element].UserName;
            LoopInsideObject[element].PassWord = LocalFromCommonLoginFolder.JsonData[element].PassWord;
        };

        LocalReturnData.FolderData = LoopInsideObject;

        return LoopInsideObject;
    });

    return LocalReturnData;
};


let StartFunc_30May = () => {
    let LocaFromCommonJSONUploadFolder = CommonJSONUploadFolder.StartFunc();
    let LocaCommonJSONFolder = CommonJSONFolder.StartFunc();
    let LocalReturnData = {};
    LocalReturnData.FolderData = {};
    LocalReturnData.KTF = true;

    let LocalFromCommonLoginFolder = CommonLoginFolder.StartFunc();

    LocalReturnData = { ...LocalFromCommonLoginFolder };

    if (LocalFromCommonLoginFolder.KTF === false) {
        return LocalReturnData;
    };

    console.log("LocalFromCommonLoginFolder : ", LocalFromCommonLoginFolder);
    LocaFromCommonJSONUploadFolder.forEach(element => {
        LocalReturnData.FolderData[element] = {};
        LocalReturnData.FolderData[element].JsonPk = element;
        LocalReturnData.FolderData[element].DataMissing = false;

        let LocalFilteredArray = LocaFromCommonJSONUploadFolder.filter(element => LocaCommonJSONFolder.includes(element));

        if (LocalFilteredArray.length === 0) {
            LocalReturnData.FolderData[element].DataMissing = true;
        };
    });

    return LocalReturnData;
};

let LocalMockFunc = () => {
    let LocalData = StartFunc();
    console.log("LocalData", LocalData);
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Keshav30") {
        let LocalData = StartFunc();
        console.log("LocalData", LocalData, LocalData.FolderData);
    };
};

// LocalMockFunc();

module.exports = { StartFunc };
