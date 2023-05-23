let CommonDataSupply = require(".././../DataSupply/Fs/Data/Items/PullData");
let _ = require("lodash");

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

                    let LocalJsonConfig = {
                        inFolderName: LocalFolderName,
                        inJsonFileName: LocalFileName
                    };

                    let LocalItemConfig = {
                        inItemName: LocalItemName
                    };

                    let LocalDataToCheck = CommonDataSupply.ReturnDataFromJsonWithItemName({
                        inJsonConfig: LocalJsonConfig,
                        inItemConfig: LocalItemConfig, inUserPK
                    });

                    LocalPresentInDataCheckReturn = LocalSubFuncs.PresentInData.StartFunc({
                        inDataToCheck: LocalDataToCheck,
                        inColumnData, inObjectToInsert
                    });
                    //console.log("LocalPresentInDataCheckReturn : ", LocalPresentInDataCheckReturn);
                    if (LocalPresentInDataCheckReturn.KTF === false) {
                        LocalRetTf.KTF = false;
                        LocalRetTf.KReason += `Unique, ${LocalPresentInDataCheckReturn.KReason} `;
                    };
                }

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
                return LocalSwitchFunc({
                    inUserData: inUserData[LocalItemName],
                    inColumnData: LoopItemColumn,
                    inObjectToInsert, inUserPK
                });

            };
        });

        let LocalFindTF = _.find(LocalReturnTFArray, { "KTF": false });

        if (LocalFindTF === undefined === false) {
            return LocalFindTF;
        };

        return LocalRetTf;
    } catch (error) {
        console.log("error : ", error);
    };
};

let ServerSideCheckAsync = async ({ inItemConfig, inUserData, inConfigTableColumns, inObjectToInsert, inUserPK }) => {
    let LocalItemName = inItemConfig.inItemName;
    let LocalConfigTableColumns = inConfigTableColumns;

    let LocalTableColumnsForSaveCheck;
    let LocalRetTf = { KTF: true, KReason: "From ServerSideCheck" };
    let LocalReturnFromSwitch;

    LocalTableColumnsForSaveCheck = LocalConfigTableColumns.filter(LoopItem => {
        if ("ServerSide" in LoopItem) {
            return LoopItem.ServerSide.SaveCheck.Validate;
        };
    });

    LocalTableColumnsForSaveCheck.forEach((LoopItemColumn) => {
        LocalReturnFromSwitch = LocalSwitchFunc({
            inUserData: inUserData[LocalItemName],
            inColumnData: LoopItemColumn,
            inObjectToInsert, inUserPK
        });

        if (LocalReturnFromSwitch.KTF === false) {
            LocalRetTf.KTF = false;
            LocalRetTf.KReason += ` - ${LocalReturnFromSwitch.KReason}`;
        };
    });

    return await LocalRetTf;
};

module.exports = { ServerSideCheck, ServerSideCheckAsync };
