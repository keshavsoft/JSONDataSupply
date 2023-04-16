let CommonCheck = require("../Check");

let fs = require("fs-extra");

let StartFunc = async ({ inFolderName, inFileNameOnly, inToFileName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    //let LocalReturnData = { KTF: false, KReason: "" };

    let localFromCommonCheck = await CommonCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK
    });

    let LocalReturnData = { ...localFromCommonCheck };
    LocalReturnData.KTF = false;

    if (localFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = localFromCommonCheck.KReason;

        //LocalReturnData.KReason = `FileName : ${inFileNameOnly} not found in ${inDataPK}: Config Folder...`;

        return await LocalReturnData;
    };
    console.log("localFromCommonCheck----------", localFromCommonCheck);

    let localFrominToFileName = await CommonCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inFileNameOnly: inToFileName,
        inDataPK
    });
    console.log("1111111111----------", localFrominToFileName);

    if (localFrominToFileName.KTF) {
        LocalReturnData.KReason = `FileName : ${inToFolderName} already present in Config Folder...`;

        return await LocalReturnData;
    };
    console.log("22222222----------", localFrominToFileName);


    try {
        fs.copyFileSync(localFromCommonCheck.UserJsonFilePath, localFrominToFileName.UserJsonFilePath);
        LocalReturnData.KTF = true;

        return await LocalReturnData;
    } catch (error) {

    };


    // try {
    //     fs.copySync(localFromCommonCheck.FolderPath, localFrominToFileName.FolderPath);
    //     LocalReturnData.KTF = true;

    //     return await LocalReturnData;
    // } catch (error) {

    // };

    // fs.copy('/path/to/source', '/path/to/destination', function (err) {
    //     if (err) return console.error(err)
    //     console.log('success!')
    // });

};

let localMockFunc = async () => {
    let localdata = await StartFunc({
        inFolderName: "Transactions",
        inFileNameOnly: "GST-SALES",
        inToFileName: "GST-SALES1",
        inDataPK: "1023"
    });

    console.log("localdata", localdata);
};

// localMockFunc();

module.exports = { StartFunc };