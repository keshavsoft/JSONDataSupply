//let CommonDataSupply = require(".././../DataSupply/Fs/Data/Items/PullData");

let CommonDataSupply = require("../../../Fs/Config/JSONFolder/DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");

let _ = require("lodash");

let StartFunc = ({ inUserData, inColumnData, inObjectToInsert, inUserPK, inFilterCondition }) => {
    let LocalRetTf = { KTF: false, KReason: "From SwitchFunc ArrayFilter" };

    let LocalFilterCondition = inFilterCondition;

    let LocalFolderName = inColumnData.ServerSide.DefaultShowData.FolderName;
    let LocalFileName = inColumnData.ServerSide.DefaultShowData.FileName;
    let LocalItemName = inColumnData.ServerSide.DefaultShowData.ItemName;

    let LocalDataToCheck = CommonDataSupply.StartFunc({
        inFolderName: LocalFolderName,
        inFileNameOnly: LocalFileName,
        inItemName: LocalItemName,
        inDataPK: inUserPK
    });

    LocalRetTf = { ...LocalDataToCheck };
    LocalRetTf.KTF = false;

    if (LocalDataToCheck.KTF === false) {
        delete LocalRetTf.JsonData;
        return LocalRetTf;
    };

    let LocalReturnArray = LocalObjectToArray({ inObject: LocalDataToCheck.JsonData });

    let LocalFilteredArray = LocalReturnArray.filter(element => {
        return eval(LocalFilterCondition);
    });
    if (LocalFilteredArray.length === 0) {
        LocalRetTf.KReason = `FilterString Not Found in ArrayFilter : ${inColumnData.DataAttribute}`;
        LocalRetTf.ColumnDataAttribute = inColumnData.DataAttribute;
        return LocalRetTf;
    };
    LocalRetTf.KTF = true;
    return LocalRetTf;

};

let LocalObjectToArray = ({ inObject }) => {
    let LocalReturnArray = Object.entries(inObject);

    return LocalReturnArray;
};

module.exports = { StartFunc };
