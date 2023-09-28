//let CommonDataSupply = require(".././../DataSupply/Fs/Data/Items/PullData");

let CommonDataSupply = require("../Fs/Config/JSONFolder/DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");

let _ = require("lodash");
let CommonSwitchFunc = require("./CheckBeforeSave/SwitchFunc.js");

let LocalSwitchFunc = ({ inUserData, inColumnData, inObjectToInsert, inUserPK }) => {
    try {
        let LocalUserDataWithItemName = inUserData;
        let LocalRetTf = { KTF: true, KReason: "From ServerSideCheck" };

        switch (inColumnData.ServerSide.SaveCheck.Type) {
            case "Unique":
                for (const prop in LocalUserDataWithItemName) {
                    if (LocalUserDataWithItemName[prop][inColumnData.DataAttribute] !== null) {
                        if (LocalUserDataWithItemName[prop][inColumnData.DataAttribute] === inObjectToInsert[inColumnData.DataAttribute]) {
                            LocalRetTf.KTF = false;
                        };
                    }
                };

                if (LocalRetTf.KTF === false) {
                    LocalRetTf.KReason += `Unique, ${inColumnData.DataAttribute} `;
                };

                break;
            case "PresentInData":
                {
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

                    LocalPresentInDataCheckReturn = LocalSubFuncs.PresentInData.StartFunc({
                        inDataToCheck: LocalDataToCheck.JsonData,
                        inColumnData, inObjectToInsert
                    });

                    LocalRetTf = { ...LocalPresentInDataCheckReturn };
                    LocalRetTf.KTF = false;

                    if (LocalPresentInDataCheckReturn.KTF) {
                        LocalRetTf.KTF = true;
                        return LocalRetTf;
                    };

                    if (LocalPresentInDataCheckReturn.KTF === false) {
                        delete LocalRetTf.JsonData; ``
                        LocalRetTf.KTF = false;
                        LocalRetTf.KReason += `PresentInData, ${LocalPresentInDataCheckReturn.KReason} `;
                    };
                };

                break;
            case "ArrayFilter":
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

                break;
            default:
                break;
        };

        return LocalRetTf;
    } catch (error) {
        console.log("error : ", error);
    };
};

let LocalSubFuncs = {
    PresentInData: {
        StartFunc: ({ inDataToCheck, inColumnData, inObjectToInsert }) => {
            let LocalCheckColumnName = inColumnData.ServerSide.DefaultShowData.CheckColumnName;
            let LocalFromValueToCheck = inObjectToInsert[inColumnData.DataAttribute];
            let LocalRetTf = { KTF: false, KReason: "From PresentInData" };

            switch (LocalCheckColumnName) {
                case "pk":
                    if (LocalFromValueToCheck in inDataToCheck) {
                        LocalRetTf.KTF = true;
                    };

                    break;
                default:
                    {
                        let LocalReturnData = LocalSubFuncs.PresentInData.CommonFuns.ForOtherColumn({
                            inDataToCheck,
                            inFromValueToCheck: LocalFromValueToCheck,
                            inCheckColumnName: LocalCheckColumnName
                        });

                        if (LocalReturnData.KTF) {
                            LocalRetTf.KTF = true;
                        };

                        LocalRetTf.KReason += LocalReturnData.KReason;
                    }

                    break;
            };

            return LocalRetTf;
            //console.log("CheckColumnName : ", inColumnData.ServerSide.DefaultShowData.CheckColumnName);
        },
        CommonFuns: {
            ForOtherColumn: ({ inDataToCheck, inFromValueToCheck, inCheckColumnName }) => {
                let LocalRetTf = { KTF: false, KReason: `From PresentInData-Column other than ${inCheckColumnName}` };
                let LocalDataToCheckAsArray = Object.values(inDataToCheck);
                let LocalFindObject = LocalDataToCheckAsArray.find(element => {
                    return element[inCheckColumnName] === inFromValueToCheck;
                });
                //console.log("LocalFindObject : ", LocalFindObject, LocalFindObject !== undefined);
                if (LocalFindObject !== undefined) {
                    LocalRetTf.KTF = true;
                };

                return LocalRetTf;
            }
        }
    }
};

let ServerSideCheck = ({ inItemConfig, inUserData, inConfigData, inObjectToInsert, inUserPK }) => {
    try {
        let LocalItemName = inItemConfig.inItemName;
        let LocalTableColumnsKey = "TableColumns";

        let LocalConfigTableColumns = inConfigData[LocalTableColumnsKey];

        let LocalRetTf = { KTF: true, KReason: "From ServerSideCheck" };

        let LocalConfigTableColumnsFilter = _.filter(LocalConfigTableColumns, "ServerSide.SaveCheck.Validate", true);

        let LocalColumnsFoundInData = LocalConfigTableColumnsFilter.filter((LoopItemColumn) => {
            let LoopInsideDataAttribute = LoopItemColumn.DataAttribute;
            return Object.keys(inObjectToInsert).includes(LoopInsideDataAttribute);
        });

        let LocalReturnTFArray = LocalColumnsFoundInData.map((LoopItemColumn) => {
            let LoopInsideDataAttribute = LoopItemColumn.DataAttribute;
            if (Object.keys(inObjectToInsert).includes(LoopInsideDataAttribute)) {
                let jVarInsideFromSwitch = CommonSwitchFunc.StartFunc({
                    inUserData: inUserData[LocalItemName],
                    inColumnData: LoopItemColumn,
                    inObjectToInsert, inUserPK
                });
                delete jVarInsideFromSwitch.JsonData;
                console.log("jVarInsideFromSwitch", jVarInsideFromSwitch);

                return jVarInsideFromSwitch;
            };
        });

        let LocalFindTF = _.find(LocalReturnTFArray, { "KTF": false });
        console.log('Loc', LocalFindTF);

        if (LocalFindTF === undefined === false) {
            delete LocalFindTF.JsonData;
            return LocalFindTF;
        };
        return LocalRetTf;
    } catch (error) {
        console.log("error : ", error);
    };
};

module.exports = { ServerSideCheck };
