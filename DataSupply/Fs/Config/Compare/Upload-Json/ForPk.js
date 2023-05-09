let CommonJSONUploadFolder = require("../../JSONUploadFolder/UserFolders/PullFolders/getDirectories");
let CommonJSONFolder = require("../../JSONFolder/UserFolders/PullFolders/getDirectories");

let StartFunc = () => {
    let LocaFromCommonJSONUploadFolder = CommonJSONUploadFolder.StartFunc();
    let LocaCommonJSONFolder = CommonJSONFolder.StartFunc();
    let LocalReturnData = {};
    LocalReturnData.FolderData = {};
    LocalReturnData.KTF = true;

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

// LocalMockFunc();

module.exports = { StartFunc };
