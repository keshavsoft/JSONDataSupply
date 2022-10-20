let CommonPullDataAdmin = require("../../DefultFileNames/Display/PullData");
let CommonPushDataAdmin = require("../../DefultFileNames/Display/PushData");

let CommonReturnDataPullDataAdmin = require("../../DefultFileNames/ReturnData/PullData");
let CommonReturnDataPushDataAdmin = require("../../DefultFileNames/ReturnData/PushData");
let CommonColumnJsonFuncs = require("../../../Fix/Json/SupplyJson");

let CommonFuns = {
    ConfigureJson: {
        TableInfo: {
            StartFunc: ({ inTableInfoObject, inJsonConfig, inItemName, inScreenName }) => {
                inTableInfoObject.SearchRowArray.Label.KTF = true;
                inTableInfoObject.SearchRowArray.Label.DisplayObject.DisplayText = `${inJsonConfig.inFolderName} - ${inJsonConfig.inJsonFileName} - ${inItemName} - ${inScreenName}`;
                inTableInfoObject.SearchRowArray.Label.DisplayObject.ColClass = "md-5 col-sm-12 col-12";

                inTableInfoObject.SearchRowArray.Search.KTF = true;
                inTableInfoObject.SearchRowArray.Search.KTF = true;

                inTableInfoObject.SearchRowArray.Button.Footer.WithApi.KTF = true;
                inTableInfoObject.SearchRowArray.Button.Footer.WithApi.DisplayObject.Table = true;
                inTableInfoObject.SearchRowArray.Button.Footer.WithApi.DisplayObject.SvgPlus = true;


                inTableInfoObject.SearchRowArray.Button.NewWindow.KTF = true;
                inTableInfoObject.SearchRowArray.Button.NewWindow.DisplayObject.NewWindow = true;
                inTableInfoObject.SearchRowArray.Button.NewWindow.DisplayObject.SvgPlus = true;

                inTableInfoObject.SearchRowArray.Button.PopUp.KTF = true;
                inTableInfoObject.SearchRowArray.Button.PopUp.DisplayObject.Chat = true;
                inTableInfoObject.SearchRowArray.Button.PopUp.DisplayObject.SvgPlus = true;

                inTableInfoObject.Vertical.VerticalCreate.saveFromKeyAsTree = true;

                inTableInfoObject.TableRowOptions.Delete.Simple = true;
                inTableInfoObject.TableRowOptions.Show.Rowshow = true;
                inTableInfoObject.TableRowOptions.PopUp.Rowshow = true;
            }
        },
        TableColumn: {
            PkColumn: ({ inTableColumnObject }) => {
                inTableColumnObject.DisplayName = "pk";
                inTableColumnObject.DataAttribute = "pk";
                inTableColumnObject.CreateNew = false;
            }
        }
    },
    ToDisplay: async ({ inJsonConfig, inItemName, inScreenName, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();
        let LocalNewTableInfoObject = CommonColumnJsonFuncs.TableInfo();
        let LocalReturnFromPush;

        let LocalDataFromJSON = await CommonPullDataAdmin.ReturnDataAsyncOriginal({ inJsonConfig, inUserPK });
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
        let LocalDataWithItemScreen;

        if (inScreenName in LocalDataFromJSONObject[inItemName] === false) {
            LocalDataFromJSONObject[inItemName][inScreenName] = {
                TableColumns: [], TableInfo: LocalNewTableInfoObject
            };

            LocalDataWithItemScreen = LocalDataFromJSONObject[inItemName][inScreenName];

            CommonFuns.ConfigureJson.TableColumn.PkColumn({
                inTableColumnObject: LocalNewColumnObject
            });

            LocalDataWithItemScreen.TableColumns.push(LocalNewColumnObject);

            CommonFuns.ConfigureJson.TableInfo.StartFunc({
                inTableInfoObject: LocalDataFromJSONObject[inItemName][inScreenName].TableInfo,
                inJsonConfig, inItemName, inScreenName
            });

            LocalReturnFromPush = await CommonPushDataAdmin.PushDataFuncAsync({
                inJsonConfig, inUserPK,
                inOriginalData: LocalDataFromJSON,
                inDataToUpdate: LocalDataFromJSONObject
            });

            if (LocalReturnFromPush.KTF) {
                LocalReturnData.KTF = true;
            }
        };

        return await LocalReturnData;
    },
    ToReturnData: async ({ inJsonConfig, inItemName, inToName, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalReturnFromPush;
        let LocalNewReturnDataObject = CommonColumnJsonFuncs.ReturnData();

        let LocalDataFromJSON = CommonReturnDataPullDataAdmin.ReturnDataFromJson({ inJsonConfig, inUserPK });
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
        if (inToName in LocalDataFromJSONObject[inItemName] === false) {
            LocalDataFromJSONObject[inItemName][inToName] = LocalNewReturnDataObject;

            LocalReturnFromPush = await CommonReturnDataPushDataAdmin.PushDataFunc({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject });

            if (LocalReturnFromPush.KTF) {
                LocalReturnData.KTF = true;
            };
        };

        return LocalReturnData;
    }
};

let Insert = ({ inJsonConfig, inItemName, inToName, inUserPK }) => {
    return new Promise((resolve, reject) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };

        CommonFuns.ToDisplay({ inJsonConfig, inItemName, inToName, inUserPK }).then(PromiseDataToDisplay => {
            CommonFuns.ToReturnData({ inJsonConfig, inItemName, inToName, inUserPK }).then(PromiseDataToReturnData => {
                resolve(PromiseDataToReturnData);
            });
        });
    });
};

module.exports = { Insert };