let CommonFromCheck = require("../Check");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromCheck;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });
        //  console.log("LocalFromCommonFromCheck : ", LocalFromCommonFromCheck);
        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonData = LocalFromCommonFromCheck.JsonData[LocalinScreenName];
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let ReturnHtmlFiles = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromCheck;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        LocalFromCommonFromCheck = await CommonFromCheck.ForExistence({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });
        console.log("LocalFromCommonFromCheck-------- : ", LocalFromCommonFromCheck);
        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };

        let LocalPrintFilesArray = LocalFromCommonFromCheck.JsonData[LocalinScreenName];

        console.log("LocalPrintFilesArray : ", LocalPrintFilesArray);
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let LocalReturnFileData = () => {

};

let MockFuncFromFolderFile = async () => {
    return await ReturnHtmlFiles({
        inFolderName: "Transactions",
        inFileNameWithExtension: "GST-SALES.json",
        inItemName: "GST-SALE",
        inScreenName: "Print",
        inDataPK: 1022
    });
};

MockFuncFromFolderFile().then(p => {
    console.log("aaaaaaaa : ", p);
});

module.exports = {
    StartFunc,
    ReturnHtmlFiles
};