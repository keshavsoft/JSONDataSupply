let CommonCheck = require("../Check");

let fs = require("fs-extra");

let StartFunc = async ({ inFolderName, inFileNameOnly, inToFileName, inDataPK }) => {

    let LocalReturnData = { KTF: false, KReason: "" };

    let localFromCommonCheck = await CommonCheck.ForExistence({
        inFolderName, inFileNameOnly,
        inDataPK
    });

    if (localFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = `FileName : ${inFileNameOnly} not found in Config Folder...`;

        return await LocalReturnData;
    };

    let localFrominToFileName = await CommonCheck.ForExistence({
        inFolderName,
        inFileNameOnly: inToFileName,
        inDataPK
    });

    if (localFrominToFileName.KTF) {
        LocalReturnData.KReason = `FileName : ${inToFileName} already present in Config Folder...`;

        return await LocalReturnData;
    };

    try {
        fs.copySync(localFromCommonCheck.JsonFilePath, localFrominToFileName.JsonFilePath);

        return await LocalReturnData;
    } catch (error) {

    };

    // fs.copy('/path/to/source', '/path/to/destination', function (err) {
    //     if (err) return console.error(err)
    //     console.log('success!')
    // });

};

let localMockFunc = async () => {
    let localdata = await StartFunc({
        inFolderName: "Transactions",
        inFileNameOnly: "GST-PURCHASES",
        inToFileName: "GST-PURCHASES5",
        inDataPK: "1022"

    });
    console.log("localdata", localdata);
};

// localMockFunc();

module.exports = { StartFunc };