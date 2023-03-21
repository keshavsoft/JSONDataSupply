let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../PushData/FromFoldFile");
let CommonColumnJsonFuncs = require("../../../../../../../../../../../../Fix/Json/SupplyJson");


let Create = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, subtablecolumnkey, ColumnName }) => {

    let LocalinDataPK = DataPK;
    let inJsonConfig = { inFolderName: FolderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let Localsubtablecolumnkey = subtablecolumnkey;
    let localColumnName = ColumnName;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false, KReason: {} };

    let LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();

    let LocalFromPullData = await CommonPullDataFromConfig.FromJsonConfig({
        inJsonConfig,
        inDataPK: LocalinDataPK
    });

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if ((LocalItemName in LocalNewData) === false) {
        LocalReturnObject.KReason = `Item Name : ${LocalItemName} not found in data!`

        return await LocalReturnObject;
    };

    if ((LocalScreenName in LocalNewData[LocalItemName]) === false) {
        LocalReturnObject.KReason = `ScreenName : ${LocalScreenName} not found in data!`

        return await LocalReturnObject;
    };

    if (("SubTableColumns" in LocalNewData[LocalItemName][LocalScreenName]) === false) {
        LocalReturnObject.KReason = `SubTableColumns not found in data!`

        return await LocalReturnObject;
    };

    if ((Localsubtablecolumnkey in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns) === false) {
        LocalReturnObject.KReason = `subtablecolumnkey : ${Localsubtablecolumnkey} not found in data!`

        return await LocalReturnObject;
    };

    if (("TableColumns" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey]) === false) {
        LocalReturnObject.KReason = `TableColumns not found in data!`

        return await LocalReturnObject;
    };



    let localTableColumsFind = LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey].TableColumns.find((loopitem) => {
        return loopitem.DataAttribute === localColumnName;
    });

    if ((localTableColumsFind === undefined) === false) {
        LocalReturnObject.KReason = `ColumnName: ${localColumnName} already found in data!`

        return await LocalReturnObject;
    };

    if ((localColumnName in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey].TableColumns) === false) {

        LocalNewColumnObject.DisplayName = localColumnName;
        LocalNewColumnObject.DataAttribute = localColumnName;
        LocalNewColumnObject.ShowInTable = true;
        LocalNewColumnObject.CreateNew = true;
        LocalNewColumnObject.Insert = true;

        LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey].TableColumns.push(LocalNewColumnObject);

        LocalFromUpdate = await CommonFromPushData.StartFunc({
            inFolderName: FolderName,
            inFileNameWithExtension: FileName,
            inDataPK: LocalinDataPK,
            inDataToUpdate: LocalNewData,
            inOriginalData: LocalFromPullData.JsonData
        });


        if (LocalFromUpdate.KTF) {
            LocalReturnObject.KTF = true;
        };

        return await LocalReturnObject;
    };


    return await LocalReturnObject;
};

let MockFunc = () => {
    Create({ DataPK: 1022, FolderName: "Transactions", FileName: "GST-SALES", ItemName: "GST-SALE", ScreenName: "Create", subtablecolumnkey: "InvGrid", ColumnName: "FK" }).then((PromiseData) => {
        console.log("PromiseData---:", PromiseData);
    });
};
// MockFunc();


module.exports = {
    Create
};