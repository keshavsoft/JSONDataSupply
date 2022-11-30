let _ = require("lodash");

let CommonFromReturnDataJson = require("../../ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromReturnDataJson");
let CommonWithUiTableRowShow = require("../../ConfigFromDisplayJson/Screens/Items/PullData/ForTable/Row/Show");
let CommonForTable = require("../Screens/Items/PullData/ForTable/PullFuncs");

let LocalForVerticalSave = {
    ChangeAttributes: ({ inDataFromServer, inPK }) => {
        try {
            let LocalHtmlControlTypeTables = _.filter(inDataFromServer, { HTMLControlType: "SubTable" });

            _.forEach(LocalHtmlControlTypeTables, (LoopItem) => {
                if ("FooterType" in LoopItem.KData.TableInfo) {
                    LoopItem.KData.TableInfo.FooterType.CreateNewRow.Style = "";
                    LoopItem.KData.TableInfo.FooterType.CreateNewRow.Show = true;
                    LoopItem.KData.TableInfo.FooterType.SaveType.Save = true;
                };

                if ("DataAttributes" in LoopItem.KData.TableInfo) {
                    LoopItem.KData.TableInfo.DataAttributes.PK = inPK;
                };

                LoopItem.KData.TableInfo.ShowFooter = true;
            });
        } catch (error) {
            console.log("error : ", error);
        };
    }
};

let LocalFuncsForTableFooter = {
    ForTableShow: async ({ inJsonConfig, inItemConfig, inDataPK }) => {
        let LocalDataPK = inDataPK;
        let LocalReturnData = await CommonForTable.StartFunc({ inJsonConfig, inItemConfig, inDataPk: LocalDataPK });

        if (LocalReturnData.KTF) {
            if ("DataFromServer" in LocalReturnData) {
                if (Array.isArray(LocalReturnData.DataFromServer)) {
                    LocalReturnData.DataFromServer[0].KData.TableInfo.FooterType.CreateNewRow.Style = "";
                } else {
                    LocalReturnData.KReason = "DataFromServer is not an Array";
                };
            } else {
                LocalReturnData.KReason = "DataFromServer not found in ReturnData";
            };
        };

        return await LocalReturnData;
    },
    TableShowWithAlert: async ({ inJsonConfig, inItemConfig, inDataPK, inPostData }) => {
        let LocalDataPK = inDataPK;
        let LocalReturnData = await CommonForTable.StartFunc({ inJsonConfig, inItemConfig, inDataPk: LocalDataPK });
        let LocalAlertObject = { HTMLControlType: "KAlert", KData: { SuccessAlert: true, ShowText: "Data saved." } };

        if (LocalReturnData.KTF) {
            if ("DataFromServer" in LocalReturnData) {
                if (Array.isArray(LocalReturnData.DataFromServer)) {
                    //  LocalReturnData.DataFromServer[0].KData.TableInfo.FooterType.CreateNewRow.Style = "";

                    let firstKey = Object.keys(inPostData)[0];

                    LocalAlertObject.KData.ShowText = `${firstKey} : ${inPostData[firstKey]} deleted successfully.`;

                    //LocalReturnData.DataFromServer.unshift(LocalAlertObject);
                    LocalReturnData.DataFromServer.push(LocalAlertObject);
                } else {
                    LocalReturnData.KReason = "DataFromServer is not an Array";
                };
            } else {
                LocalReturnData.KReason = "DataFromServer not found in ReturnData";
            };
        };

        return await LocalReturnData;
    }
};

let LocalFuncsForVertical = {
    TableShowWithAlert: async ({ inJsonConfig, inItemConfig, inDataPK, inPostData }) => {
        let LocalDataPK = inDataPK;
        let LocalReturnData = await CommonForTable.StartFunc({ inJsonConfig, inItemConfig, inDataPk: LocalDataPK });
        let LocalAlertObject = { HTMLControlType: "KAlert", KData: { SuccessAlert: true, ShowText: "Data saved." } };

        if (LocalReturnData.KTF) {
            if ("DataFromServer" in LocalReturnData) {
                if (Array.isArray(LocalReturnData.DataFromServer)) {
                    let firstKey = Object.keys(inPostData)[0];

                    LocalAlertObject.KData.ShowText = `${firstKey} : ${inPostData[firstKey]} saved successfully.`;

                    LocalReturnData.DataFromServer.push(LocalAlertObject);
                } else {
                    LocalReturnData.KReason = "DataFromServer is not an Array";
                };
            } else {
                LocalReturnData.KReason = "DataFromServer not found in ReturnData";
            };
        };

        return await LocalReturnData;
    }
}

exports.VerticalSave = async ({ inJsonConfig, inItemConfig, inPK, inUserPK, inPostData }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    let LocalFromReturn;
    let LocalData = await CommonFromReturnDataJson.UsingJsonConfigAsync({ inJsonConfig, inItemConfig, inDataPK: inUserPK });

    if (LocalData.KTF) {
        if (LocalData.JsonData !== undefined) {
            if (LocalData.JsonData.hasOwnProperty("Vertical")) {
                if (LocalData.JsonData.Vertical.Footer.Save.ReturnData.KTF) {
                    LocalReturnData.KStudy = {};
                    LocalReturnData.KStudy.ReturnData = {};
                    LocalReturnData.KStudy.ReturnData.DataType = LocalData.JsonData.Vertical.Footer.Save.ReturnData.DataType;

                    switch (LocalData.JsonData.Vertical.Footer.Save.ReturnData.DataType) {
                        case "Vertical":
                            //return LocalReturnData;
                            break;
                        case "TableShow":
                            //LocalReturnData = CommonTableShowData.WithDisplayJSON({ inJsonConfig, inItemConfig, inUserPK });
                            break;
                        case "TableShowWithAlert":
                            LocalReturnData = await LocalFuncsForVertical.TableShowWithAlert({
                                inJsonConfig, inItemConfig, inDataPK: inUserPK,
                                inPostData
                            });

                            return await LocalReturnData;
                        case "VerticalShow":
                            LocalFromReturn = await CommonWithUiTableRowShow.StartFunc({
                                inJsonConfig,
                                inItemConfig, inPK, inDataPK: inUserPK
                            });

                            if (LocalFromReturn.KTF === false) {
                                LocalReturnData.KReason = LocalFromReturn.KReason;
                                return await LocalReturnData;
                            };
                            LocalForVerticalSave.ChangeAttributes({
                                inDataFromServer: LocalFromReturn.DataFromServer,
                                inPK
                            });

                            LocalReturnData.KTF = true;
                            LocalReturnData.DataFromServer = LocalFromReturn.DataFromServer;

                            break;
                        default:
                            //return "";
                            break;
                    };
                };
            };
        };
    } else {
        LocalReturnData.KReason = LocalData.KReason;
    };

    return await LocalReturnData;
};

exports.VerticalUpdate = async ({ inJsonConfig, inItemConfig, inPK, inUserPK, inPostData }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    let LocalData = await CommonFromReturnDataJson.UsingJsonConfigAsync({ inJsonConfig, inItemConfig, inDataPK: inUserPK });
    let LocalVerticalSubKey = "Update";

    if (LocalData.KTF) {
        if (LocalData.JsonData !== undefined) {
            if (LocalData.JsonData.hasOwnProperty("Vertical")) {
                if ((LocalVerticalSubKey in LocalData.JsonData.Vertical.Footer) === false) {
                    LocalReturnData.KReason = `Update not found in Vertical`;

                    return await LocalReturnData;
                };

                if (LocalData.JsonData.Vertical.Footer[LocalVerticalSubKey].ReturnData.KTF) {
                    switch (LocalData.JsonData.Vertical.Footer[LocalVerticalSubKey].ReturnData.DataType) {
                        case "Vertical":
                            //return LocalReturnData;
                            break;
                        case "TableShow":
                            //LocalReturnData = CommonTableShowData.WithDisplayJSON({ inJsonConfig, inItemConfig, inUserPK });
                            break;
                        case "TableShowWithAlert":
                            LocalReturnData = await LocalFuncsForVertical.TableShowWithAlert({
                                inJsonConfig, inItemConfig, inDataPK: inUserPK,
                                inPostData
                            });

                            return await LocalReturnData;
                        case "VerticalShow":
                            LocalReturnData = await CommonWithUiTableRowShow.StartFunc({
                                inJsonConfig,
                                inItemConfig, inPK, inDataPK: inUserPK
                            })

                            if (LocalReturnData.KTF) {
                                LocalForVerticalSave.ChangeAttributes({
                                    inDataFromServer: LocalReturnData.DataFromServer,
                                    inPK
                                });
                            };

                            break;
                        case "TableShowWithAlert":
                            //LocalReturnData = CommonTableShowData.WithDisplayJSON({ inJsonConfig, inItemConfig, inUserPK });

                            // if ("DataFromServer" in LocalReturnData) {
                            //     firstKey = Object.keys(inPostData)[0];

                            //     LocalAlertObject.KData.ShowText = `${firstKey} : ${inPostData[firstKey]} saved successfully.`;
                            //     LocalReturnData.DataFromServer.unshift(LocalAlertObject);
                            // };

                            break;
                        default:
                            //return "";
                            break;
                    };
                };
            };
        };
    } else {
        LocalReturnData.KReason = LocalData.KReason;
    };

    return await LocalReturnData;
};

exports.SubTableFooter = async ({ inJsonConfig, inItemConfig, inUserPK, inPK }) => {
    let LocalData = await CommonFromReturnDataJson.UsingJsonConfigAsync({
        inJsonConfig,
        inItemConfig, inDataPK: inUserPK
    });

    let LocalReturnData;

    if (LocalData.KTF) {
        if (LocalData.JsonData !== undefined) {
            if (LocalData.JsonData.hasOwnProperty("SubTable")) {
                if (LocalData.JsonData.SubTable.Footer.Save.ReturnData.KTF) {
                    switch (LocalData.JsonData.SubTable.Footer.Save.ReturnData.DataType) {
                        case "TableShow":
                            LocalReturnData = CommonTableShowData.WithDisplayJSON({ inJsonConfig, inItemConfig, inUserPK });

                            return LocalReturnData;
                        case "VerticalShow":
                            LocalReturnData = await CommonWithUiTableRowShow.StartFunc({
                                inJsonConfig,
                                inItemConfig, inPK, inDataPK: inUserPK
                            })
                            if (LocalReturnData.KTF) {
                                LocalForVerticalSave.ChangeAttributes({
                                    inDataFromServer: LocalReturnData.DataFromServer,
                                    inPK
                                });
                            };
                            return await LocalReturnData;
                            break;
                        default:
                            break;
                    };

                };
            };
        };
    };

    //return { KTF: true, KMessage: "Inserted", DataFromServer: inPKInserted };
    return { KTF: true, KMessage: "Inserted", DataFromServer: 0 };
};

exports.TableFooter = async ({ inJsonConfig, inItemConfig, inUserPK, inPK, inPostData }) => {
    let LocalData = await CommonFromReturnDataJson.UsingJsonConfigAsync({
        inJsonConfig,
        inItemConfig, inDataPK: inUserPK
    });

    let LocalReturnData;

    if (LocalData.KTF) {
        if (LocalData.JsonData !== undefined) {
            if (LocalData.JsonData.hasOwnProperty("Table")) {
                if (LocalData.JsonData.Table.Footer.Save.ReturnData.KTF) {
                    switch (LocalData.JsonData.Table.Footer.Save.ReturnData.DataType) {
                        case "TableShow":
                            // LocalReturnData = CommonForTable.StartFunc({ inJsonConfig, inItemConfig, inDataPk: inUserPK });

                            // return LocalReturnData;
                            LocalReturnData = await LocalFuncsForTableFooter.ForTableShow({ inJsonConfig, inItemConfig, inDataPK: inUserPK });

                            return await LocalReturnData;
                        case "TableShowWithAlert":
                            LocalReturnData = await LocalFuncsForTableFooter.TableShowWithAlert({
                                inJsonConfig, inItemConfig, inDataPK: inUserPK,
                                inPostData
                            });

                            return await LocalReturnData;
                        case "VerticalShow":
                            LocalReturnData = await CommonWithUiTableRowShow.StartFunc({
                                inJsonConfig,
                                inItemConfig, inPK, inDataPK: inUserPK
                            })

                            if (LocalReturnData.KTF) {
                                LocalForVerticalSave.ChangeAttributes({
                                    inDataFromServer: LocalReturnData.DataFromServer,
                                    inPK
                                });
                            };
                            return await LocalReturnData;
                            break;
                        default:
                            break;
                    };

                };
            };
        };
    };

    //return { KTF: true, KMessage: "Inserted", DataFromServer: inPKInserted };
    return { KTF: true, KMessage: "Inserted", DataFromServer: 0 };
};

exports.TableRowDelete = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK }) => {
    let LocalJsonConfig = {
        inFolderName: inFolderName,
        inJsonFileName: inFileNameWithExtension
    };

    let LocalItemConfig = {
        inItemName: inItemName,
        inScreenName: inScreenName
    };

    let LocalData = await CommonFromReturnDataJson.UsingJsonConfigAsync({
        inJsonConfig: LocalJsonConfig,
        inItemConfig: LocalItemConfig,
        inDataPK
    });

    let LocalReturnData;

    if (LocalData.KTF) {
        if (LocalData.JsonData !== undefined) {
            if (LocalData.JsonData.hasOwnProperty("Table")) {
                if (LocalData.JsonData.Table.Row.Delete.ReturnData.KTF) {
                    switch (LocalData.JsonData.Table.Row.Delete.ReturnData.DataType) {
                        case "TableShow":
                            LocalReturnData = await LocalFuncsForTableFooter.ForTableShow({
                                inJsonConfig: LocalJsonConfig,
                                inItemConfig: LocalItemConfig,
                                inDataPK
                            });

                            return await LocalReturnData;
                        case "TableShowWithAlert":
                            LocalReturnData = await LocalFuncsForTableFooter.TableShowWithAlert({
                                inJsonConfig: LocalJsonConfig,
                                inItemConfig: LocalItemConfig,
                                inDataPK,
                                inPostData: inJsonPK
                            });

                            return await LocalReturnData;
                        case "VerticalShow":
                            LocalReturnData = await CommonWithUiTableRowShow.StartFunc({
                                inJsonConfig: LocalJsonConfig,
                                inItemConfig: LocalItemConfig,
                                inPK, inDataPK
                            })

                            if (LocalReturnData.KTF) {
                                LocalForVerticalSave.ChangeAttributes({
                                    inDataFromServer: LocalReturnData.DataFromServer,
                                    inPK
                                });
                            };
                            return await LocalReturnData;
                            break;
                        default:
                            break;
                    };
                };
            };
        };
    };

    return { KTF: true, KMessage: "Deleted", DataFromServer: 0 };
};

exports.SubTableRowDelete1 = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK }) => {
    let LocalJsonConfig = {
        inFolderName: inFolderName,
        inJsonFileName: inFileNameWithExtension
    };

    let LocalItemConfig = {
        inItemName: inItemName,
        inScreenName: inScreenName
    };

    let LocalData = await CommonFromReturnDataJson.UsingJsonConfigAsync({
        inJsonConfig: LocalJsonConfig,
        inItemConfig: LocalItemConfig,
        inDataPK
    });

    let LocalReturnData;

    if (LocalData.KTF) {
        if (LocalData.JsonData !== undefined) {
            if (LocalData.JsonData.hasOwnProperty("SubTable")) {
                if (LocalData.JsonData.SubTable.Row.Delete.ReturnData.KTF) {
                    switch (LocalData.JsonData.SubTable.Row.Delete.ReturnData.DataType) {
                        case "TableShow":
                            LocalReturnData = await LocalFuncsForTableFooter.ForTableShow({
                                inJsonConfig: LocalJsonConfig,
                                inItemConfig: LocalItemConfig,
                                inDataPK
                            });

                            return await LocalReturnData;
                        case "TableShowWithAlert":
                            LocalReturnData = await LocalFuncsForTableFooter.TableShowWithAlert({
                                inJsonConfig: LocalJsonConfig,
                                inItemConfig: LocalItemConfig,
                                inDataPK,
                                inPostData: inJsonPK
                            });

                            return await LocalReturnData;
                        case "VerticalShow":
                            LocalReturnData = await CommonWithUiTableRowShow.StartFunc({
                                inJsonConfig: LocalJsonConfig,
                                inItemConfig: LocalItemConfig,
                                inPK: inJsonPK,
                                inDataPK
                            })

                            if (LocalReturnData.KTF) {
                                LocalForVerticalSave.ChangeAttributes({
                                    inDataFromServer: LocalReturnData.DataFromServer,
                                    inPK: inJsonPK
                                });
                            };
                            return await LocalReturnData;
                            break;
                        default:
                            break;
                    };
                };
            };
        };
    };

    return { KTF: true, KMessage: "Deleted", DataFromServer: 0 };
};


exports.SubTableRowDelete = async ({ inJsonConfig, inItemConfig, inPK, inUserPK, inPostData }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    let LocalFromReturn;
    let LocalData = await CommonFromReturnDataJson.UsingJsonConfigAsync({ inJsonConfig, inItemConfig, inDataPK: inUserPK });

    if (LocalData.KTF) {
        if (LocalData.JsonData !== undefined) {
            if (LocalData.JsonData.hasOwnProperty("SubTable")) {
                if (LocalData.JsonData.SubTable.Row.Delete.ReturnData.KTF) {
                    LocalReturnData.KStudy = {};
                    LocalReturnData.KStudy.ReturnData = {};
                    LocalReturnData.KStudy.ReturnData.DataType = LocalData.JsonData.SubTable.Row.Delete.ReturnData.DataType;

                    switch (LocalData.JsonData.SubTable.Row.Delete.ReturnData.DataType) {
                        case "Vertical":
                            //return LocalReturnData;
                            break;
                        case "TableShow":
                            //LocalReturnData = CommonTableShowData.WithDisplayJSON({ inJsonConfig, inItemConfig, inUserPK });
                            break;
                        case "TableShowWithAlert":
                            LocalReturnData = await LocalFuncsForVertical.TableShowWithAlert({
                                inJsonConfig, inItemConfig, inDataPK: inUserPK,
                                inPostData
                            });

                            return await LocalReturnData;
                        case "VerticalShow":
                            LocalFromReturn = await CommonWithUiTableRowShow.StartFunc({
                                inJsonConfig,
                                inItemConfig, inPK, inDataPK: inUserPK
                            });

                            if (LocalFromReturn.KTF === false) {
                                LocalReturnData.KReason = LocalFromReturn.KReason;
                                return await LocalReturnData;
                            };
                            LocalForVerticalSave.ChangeAttributes({
                                inDataFromServer: LocalFromReturn.DataFromServer,
                                inPK
                            });

                            LocalReturnData.KTF = true;
                            LocalReturnData.DataFromServer = LocalFromReturn.DataFromServer;

                            break;
                        default:
                            //return "";
                            break;
                    };
                };
            };
        };
    } else {
        LocalReturnData.KReason = LocalData.KReason;
    };

    return await LocalReturnData;
};