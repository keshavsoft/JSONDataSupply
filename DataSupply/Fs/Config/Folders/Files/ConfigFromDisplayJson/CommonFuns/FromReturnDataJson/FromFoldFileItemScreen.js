let _ = require("lodash");

let CommonFromReturnDataJson = require("../../../ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromReturnDataJson");
let CommonWithUiTableRowShow = require("../../../ConfigFromDisplayJson/Screens/Items/PullData/ForTable/Row/Show");
let CommonForTable = require("../../Screens/Items/PullData/ForTable/PullFuncs");

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

exports.SubTableRowDelete = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inPK, inDataPK, inPostData }) => {
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
                                inJsonConfig, inItemConfig, inDataPK,
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