let CommonFromCheck = require("../Check");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inSubTableColumnKey, inDataPK }) => {
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
            inSubTableColumnKey,
            inDataPK: LocalDataPK
        });
        // console.log("LocalReturnObjectp------------- : ", LocalFromCommonFromCheck);
        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };
      //  console.log("LocalReturnObjectp-------------pppp : ", LocalFromCommonFromCheck);
        LocalReturnObject.JsonData = LocalFromCommonFromCheck.JsonData.TableColumns;
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let LocalMockFuncForStartFunc = async () => {
    let LocalResult = await StartFunc({
        inFolderName: "Purchases",
        inFileNameWithExtension: "Vouchers.json",
        inItemName: "VouchersName",
        inScreenName: "Create",
        inSubTableColumnKey: "InvGrid",
        inDataPK: 901
    });

    console.log("ssssssssssss : ", LocalResult.JsonData.length);
};

//LocalMockFuncForStartFunc().then();

module.exports = {
    StartFunc
};