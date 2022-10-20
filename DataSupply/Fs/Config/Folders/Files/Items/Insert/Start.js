let CommonToDataFolder = require("./ToDataFolder");
let CommonToDisplayFolder = require("./ToDisplayFolder");

let CommonToReturnDataJson = require("./ToConfigFolder/ToReturnDataJson/FoldFileItem");
let CommonToDisplayForFileJson = require("./ToConfigFolder/ToDisplayForFileJson/FoldFileItem");
//let CommonToDisplayFolder = require("./ToDisplayFolder");

let Insert = async ({ inJsonConfig, inToName, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalRetrunFromToDataJson = await CommonToDataFolder.Insert({ inJsonConfig, inToName, inUserPK });
    let LocalReturnDataFromDisplay = await CommonToDisplayFolder.Insert({ inJsonConfig, inToName, inUserPK });

    if (LocalReturnDataFromDisplay.KTF && LocalRetrunFromToReturnData.KTF && LocalRetrunFromToDataJson.KTF) {
        LocalReturnData.KTF = true;
        LocalReturnData.KResult.push(LocalReturnDataFromDisplay);
        LocalReturnData.KResult.push(LocalRetrunFromToReturnData);
        LocalReturnData.KResult.push(LocalRetrunFromToDataJson);
    };

    return LocalReturnData;
};

let FoldFileItem = async ({ inFolderName, inFileNameWithExtension, inToName, inDataPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };

    let LocalRetrunFromToDataJson = await CommonToDataFolder.FoldFileItem({
        inFolderName, inFileNameWithExtension,
        inToName, inDataPK
    });

    let LocalReturnDataFromDisplay = await CommonToDisplayForFileJson.Insert({
        inFolderName, inFileNameWithExtension,
        inToName, inDataPK
    });

    let LocalRetrunFromToReturnData = await CommonToReturnDataJson.Insert({
        inFolderName, inFileNameWithExtension,
        inToName,
        inDataPK
    });

    LocalReturnData.KResult.push(LocalReturnDataFromDisplay);
    LocalReturnData.KResult.push(LocalRetrunFromToReturnData);
    LocalReturnData.KResult.push(LocalRetrunFromToDataJson);

    if (LocalReturnDataFromDisplay.KTF && LocalRetrunFromToReturnData.KTF && LocalRetrunFromToDataJson.KTF) {
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

let MockFuncFoldFileItem = async ({ inFolderName, inFileNameWithExtension, inToName, inDataPK }) => {
    return await FoldFileItem({ inFolderName, inFileNameWithExtension, inToName, inDataPK });
};

// MockFuncFoldFileItem({
//     inFolderName: "Masters", inFileNameWithExtension: "f1.json",
//     inToName: "Item1", inDataPK: 1018
// }).then(p => {
//     console.log("P : ", p);
// });

module.exports = { Insert, FoldFileItem };