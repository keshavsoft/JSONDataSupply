let CommonFromCheck = require("../Check");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
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

        LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });
        
        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };
       // console.log("LocalFromCommonFromCheck111111 : ", LocalFromCommonFromCheck.JsonData[LocalinItemName]);
        LocalReturnObject.JsonData = LocalFromCommonFromCheck.JsonData[LocalinItemName];
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await StartFunc({
        inFolderName: "Transactions",
        inFileNameWithExtension: "GST-SALES.json",
        inItemName: "GST-SALE",
        inDataPK: 1022
    });
};

// MockFuncFromFolderFile().then(p => {
//     console.log("aaaaaaaa : ", p);
// });

module.exports = {
    StartFunc
};