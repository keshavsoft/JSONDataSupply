let _ = require("lodash");
let CommonReturnData = require("./Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromReturnDataJson");

let CommonWithUiTableRowShow = require("./Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/ForTable/Row/Show");

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

exports.VerticalSave = async ({ inJsonConfig, inItemConfig, inPK, inUserPK, inPostData }) => {
    let LocalReturnData;
    let LocalData = await CommonReturnData.UsingJsonConfigAsync({ inJsonConfig, inItemConfig, inDataPK: inUserPK });

    if (LocalData.KTF) {
        let LocalAlertObject = { HTMLControlType: "KAlert", KData: { SuccessAlert: true, ShowText: "Data saved." } };
        let firstKey;

        if (LocalData.JsonData !== undefined) {
            if (LocalData.JsonData.hasOwnProperty("Vertical")) {
                if (LocalData.JsonData.Vertical.Footer.Save.ReturnData.KTF) {
                    switch (LocalData.JsonData.Vertical.Footer.Save.ReturnData.DataType) {
                        case "Vertical":
                            //return LocalReturnData;
                            break;
                        case "TableShow":
                            //LocalReturnData = CommonTableShowData.WithDisplayJSON({ inJsonConfig, inItemConfig, inUserPK });
                            break;
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

    };
    return await LocalReturnData;
};
