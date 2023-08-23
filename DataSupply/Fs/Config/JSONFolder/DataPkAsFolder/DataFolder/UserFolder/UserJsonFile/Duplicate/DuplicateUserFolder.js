let CommonCheck = require("../Check");
let CommonMock = require("../../../../../../../../MockAllow.json");
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

    let localFrominToFileName = await CommonCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inFileNameOnly: inToFileName,
        inDataPK
    });

    // if ((localFrominToFileName.KTF) === false) {
    //     LocalReturnData.KReason = `FileName : ${inToFileName} already present in Config Folder...`;

    //     return await LocalReturnData;
    // };

    if (localFrominToFileName.KTF) {
        LocalReturnData.KReason = `FileName : ${inToFileName} already present in Config Folder...`;

        return await LocalReturnData;
    };

    try {
        fs.copyFileSync(localFromCommonCheck.UserJsonFilePath, localFrominToFileName.UserJsonFilePath);
        LocalReturnData.KTF = true;

        return await LocalReturnData;
    } catch (error) {

    };



};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'GST') {
        let LocalMockData = require('./DuplicateUserFolder.json');

        StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};



module.exports = { StartFunc };