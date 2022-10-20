let CommonPullData = require("../../../PullData");
let _ = require("lodash");
let CommonPushDataReports = require("../../../PushData");

let JsonConfig = ({ inReportConfig, inUserPK, inColumnsPk, inObjectToUpdate }) => {
    return new Promise((resolve, reject) => {
        const LocalDataToUpdate = (({ FolderName, FileName, ItemName, ColumnNameToPick,Active,ItemNameConsider }) => ({ FolderName, FileName,ItemName,ColumnNameToPick,Active,ItemNameConsider }))(inObjectToUpdate);
        
        let LocalDataFromJSON = CommonPullData.ReturnDataFromJson({ inUserPK });
        let LocalUpdatedData = JSON.parse(JSON.stringify(LocalDataFromJSON));
        let LocalReportName = inReportConfig.inReportName;
        let LocalFindVouchersConsider;

        if (LocalReportName in LocalUpdatedData) {
            if ("VouchersConsider" in LocalUpdatedData[LocalReportName]) {
                LocalFindVouchersConsider = _.find(LocalUpdatedData[LocalReportName].VouchersConsider, { 'pk': inColumnsPk });

                LocalFindVouchersConsider.FolderName = LocalDataToUpdate.FolderName;
                LocalFindVouchersConsider.FileName = LocalDataToUpdate.FileName;
                LocalFindVouchersConsider.ItemName = LocalDataToUpdate.ItemName
                LocalFindVouchersConsider.ColumnNameToPick = LocalDataToUpdate.ColumnNameToPick
                LocalFindVouchersConsider.Active = LocalDataToUpdate.Active
                LocalFindVouchersConsider.ItemNameConsider = LocalDataToUpdate.ItemNameConsider



                CommonPushDataReports.PushDataAsync({
                    inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedData
                }).then((PromiseData) => {
                    resolve(PromiseData);
                }).catch((error) => {
                    reject(error);
                });
            };
        };
    });
};

module.exports = { JsonConfig };