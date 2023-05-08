let CommonJSONUploadFolder = require("../../JSONUploadFolder/UserFolders/PullFolders/getDirectories");
let CommonJSONFolder = require("../../JSONFolder/UserFolders/PullFolders/getDirectories");

let StartFunc = () => {
    let LocaFromCommonJSONUploadFolder = CommonJSONUploadFolder.StartFunc();
    let LocaCommonJSONFolder = CommonJSONFolder.StartFunc();
    let LocalReturnObject = {};

    LocaFromCommonJSONUploadFolder.forEach(element => {
        LocalReturnObject[element] = {};
        LocalReturnObject[element].JsonPk = element;
        LocalReturnObject[element].DataMissing = false;

        let LocalFilteredArray = LocaFromCommonJSONUploadFolder.filter(element => LocaCommonJSONFolder.includes(element));
        
        if (LocalFilteredArray.length === 0) {
            LocalReturnObject[element].DataMissing = true;
        };
    });

    return LocalReturnObject;
};

let LocalMockFunc = () => {
    let LocalData = StartFunc();
    console.log("LocalData", LocalData);
};

// LocalMockFunc();

module.exports = { StartFunc };
