let localpullFolders = require("../../../getDirectories");
let fs = require("fs-extra");
//code in this file not needed.
let StartFunc = async ({ inFolderName, inFileNameOnly, inToFileName, inDataPK }) => {

    let LocalReturnData = { KTF: false, KReason: "" };

    let localFilesAsArray = await localpullFolders.AsObjects({ inFolderName, inDataPK });
    console.log(localFilesAsArray);
    if (localFilesAsArray.KTF) {
        LocalReturnData.KReason = localFilesAsArray.KReason;
        LocalReturnData.FolderPath = localFilesAsArray.FolderPath;

        return await LocalReturnData;
    };

    if (inFileNameOnly in localFilesAsArray === false) {
        LocalReturnData.KReason = `inFileName: ${inFileNameOnly} not found in config.json!`
        return await LocalReturnData;
    };

    if (inToFileName in localFilesAsArray) {
        LocalReturnData.KReason = `FileName: ${inToFileName} found in Folder.!`
        return await LocalReturnData;
    };

    fs.copy('/path/to/source', '/path/to/destination', function (err) {
        if (err) return console.error(err)
        console.log('success!')
    });
};

let localMockFunc = async () => {
    let localdata = await StartFunc({
        inFolderName: "Transactions",
        inFileNameOnly: "GST-PURCHASES",
        inToFileName: "GST-PURCHASES1",
        inDataPK: "1022"

    });
    console.log("localdata", localdata);
};

// localMockFunc();

module.exports = { StartFunc };