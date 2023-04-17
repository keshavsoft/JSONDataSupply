let CommonCheck = require("../Check");

let fs = require("fs-extra");

let StartFunc = async ({ inFolderName, inToFolderName, inDataPK }) => {
    let localFromCommonCheck = await CommonCheck.ForExistenceOfUserFolder({
        inFolderName,
        inDataPK
    });

    let LocalReturnData = { ...localFromCommonCheck };
    LocalReturnData.KTF = false;

    if (localFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = localFromCommonCheck.KReason;

        return await LocalReturnData;
    };

    let localFrominToFileName = await CommonCheck.ForExistenceOfUserFolder({
        inFolderName: inToFolderName,
        inDataPK
    });

    if (localFrominToFileName.KTF) {
        LocalReturnData.KReason = `FileName : ${inToFolderName} already present in Config Folder...`;

        return await LocalReturnData;
    };

    try {
        fs.copySync(localFromCommonCheck.FolderPath, localFrominToFileName.FolderPath);
        LocalReturnData.KTF = true;

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
        inToFolderName: "Transactions1",
        inDataPK: "1023"

    });
    console.log("localdata", localdata);
};

// localMockFunc();

module.exports = { StartFunc };