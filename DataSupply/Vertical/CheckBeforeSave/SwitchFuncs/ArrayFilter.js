//let CommonDataSupply = require(".././../DataSupply/Fs/Data/Items/PullData");

let CommonDataSupply = require("../../../Fs/Config/JSONFolder/DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");

let _ = require("lodash");

let StartFunc = ({ inUserData, inColumnData, inObjectToInsert, inUserPK, inFilterCondition }) => {
    let LocalRetTf = { KTF: false, KReason: "From SwitchFunc ArrayFilter" };

    // let LocalFilterCondition = "parseInt(element[0]) === inObjectToInsert.pk && element[1].GenerateReference.FileNameOnly==='Kakinada'";
    // let LocalFilterCondition = "element[0] === inObjectToInsert.pk && element[1].GenerateReference.FileNameOnly==='Kakinada'";
    let LocalFilterCondition = inFilterCondition;

    let LocalPresentInDataCheckReturn;
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
        // return parseInt(element[0]) === inObjectToInsert.pk;
        return eval(LocalFilterCondition);
    });
    if (LocalFilteredArray.length === 0) {
        return LocalRetTf;
    };
    LocalRetTf.KTF = true;
    return LocalRetTf;

    // LocalPresentInDataCheckReturn = LocalSubFuncs.PresentInData.StartFunc({
    //     inDataToCheck: LocalDataToCheck.JsonData,
    //     inColumnData, inObjectToInsert
    // });

    // LocalRetTf = { ...LocalPresentInDataCheckReturn };
    // LocalRetTf.KTF = false;

    // if (LocalPresentInDataCheckReturn.KTF) {
    //     LocalRetTf.KTF = true;
    //     return LocalRetTf;
    // };

    // if (LocalPresentInDataCheckReturn.KTF === false) {
    //     delete LocalRetTf.JsonData; 
    //     LocalRetTf.KTF = false;
    //     LocalRetTf.KReason += `PresentInData, ${LocalPresentInDataCheckReturn.KReason} `;
    // };

};

let LocalObjectToArray = ({ inObject }) => {
    let LocalReturnArray = Object.entries(inObject);

    return LocalReturnArray;
};

module.exports = { StartFunc };
