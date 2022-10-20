let CommonFromReturnDataJson = require("../../../../../PullData/FromConfigFolder/FromReturnDataJson/FromFoldFileItemScreen");
let CommonWithUiTableRowShow = require("../ForTable/Row/ShowFromFoldFileItemScreen");
let _ = require("lodash");

//let CommonWithUiTableRowShow = require("../../../"  "./Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/ForTable/Row/Show");

let LocalForVerticalSave = {
    ChangeAttributes: ({ inDataFromServer, inPK }) => {
        try {
            let LocalHtmlControlTypeTables = _.filter(inDataFromServer, { HTMLControlType: "Table" });

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

exports.SubTableRowDelete = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK, inPostData }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    let LocalFromReturn;
    let LocalDataNeeded;
    //console.log("11111 : ", inItemName, inScreenName, inDataPK);

    let LocalData = await CommonFromReturnDataJson.StartFunc({
        inFolderName, inFileNameWithExtension,
        inDataPK
    });
    
    if (LocalData.KTF) {
        if (LocalData.JsonData !== undefined) {
            if ((inItemName in LocalData.JsonData) === false) {
                LocalReturnData.KReason = `${inItemName} : ItemName not found in returnDataJson`;
                return await LocalReturnData;
            };

            if ((inScreenName in LocalData.JsonData[inItemName]) === false) {
                LocalReturnData.KReason = `${inScreenName} : inScreenName not found in returnDataJson:${inItemName}`;
                return await LocalReturnData;
            };
            LocalDataNeeded = LocalData.JsonData[inItemName][inScreenName];
            
            if (LocalDataNeeded.hasOwnProperty("SubTable")) {
                if (LocalDataNeeded.SubTable.Row.Delete.ReturnData.KTF) {
                    LocalReturnData.KStudy = {};
                    LocalReturnData.KStudy.ReturnData = {};
                    LocalReturnData.KStudy.ReturnData.DataType = LocalDataNeeded.SubTable.Row.Delete.ReturnData.DataType;

                    switch (LocalDataNeeded.SubTable.Row.Delete.ReturnData.DataType) {
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
                                inFolderName, inFileNameWithExtension, inItemName, inScreenName,
                                inPK: inJsonPK,
                                inDataPK
                            });
                            
                            if (LocalFromReturn.KTF === false) {
                                LocalReturnData.KReason = LocalFromReturn.KReason;
                                return await LocalReturnData;
                            };

                            LocalForVerticalSave.ChangeAttributes({
                                inDataFromServer: LocalFromReturn.DataFromServer,
                                inPK: inJsonPK
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