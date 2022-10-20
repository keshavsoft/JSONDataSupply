let CommonPullData = require("../../../../../PullData/FromConfig");

let ReturnArray = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };

    if (inDataPK > 0) {
        let LocalReturnData;
        let LocalOriginalData;
        let LocalFolderName = inFolderName;

        LocalOriginalData = await CommonPullData.FromFolderAndFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension, inUserPK: inDataPK
        });

        if (inItemName in LocalOriginalData) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.DataFromServer=Object.keys(LocalOriginalData[inItemName]);
        };
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await ReturnArray({
        inFolderName: "Masters",
        inFileNameWithExtension: "Customers.json",
        inItemName: "CustomerNames",
        inDataPk: 1018
    });
};

// MockFuncFromFolderFile().then(p => { console.log("p:", p) })

module.exports = {
    ReturnArray
};