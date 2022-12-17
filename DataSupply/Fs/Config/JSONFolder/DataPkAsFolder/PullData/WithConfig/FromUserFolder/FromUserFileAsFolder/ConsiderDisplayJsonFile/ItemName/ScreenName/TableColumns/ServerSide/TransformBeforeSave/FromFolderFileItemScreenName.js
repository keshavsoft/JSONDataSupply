let _ = require("lodash");
let CommonFromTableColumns = require("../../../../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/TableColumns/PullData/AsArray");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        let LocalCommonFromTableColumns = await CommonFromTableColumns.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });

        console.log("LocalCommonFromTableColumns : ", LocalCommonFromTableColumns);

    };

    return await LocalReturnObject;
};

StartFunc({
    inFolderName: "Masters",
    inFileNameWithExtension: "Customers.json",
    inItemName: "CustomerNames",
    inScreenName: "Create",
    inDataPK: 16
}).then(p => {
    console.log("pppp : ", p);
});

module.exports = { StartFunc };
