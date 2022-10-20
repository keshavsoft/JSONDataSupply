let CommonDisplayPullData = require("../Fs/DefultFileNames/Display/PullData");
let CommonFilesPullData = require("../Fs/Files/PullData");
let CommonSubTableSave = require("./SubTableSave");
let CommonSaveNormalFuncs = require("./Save");
let CommonCheckBeforeSave = require("../Vertical/CheckBeforeSave");

let Save = ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    return new Promise((resolve, reject) => {
        let LocalItemName = inItemConfig.inItemName;
        let LocalUserData;
        let LocalReturnFromSave;
        let LocalConfigData;
        let LocalSaveFirstRow;
        let LocalTableColumnsNeeded;

        if (inUserPK > 0) {
            LocalUserData = CommonFilesPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
            LocalConfigData = CommonDisplayPullData.ReturnDataFromJsonAndItemName({ inJsonConfig, inItemConfig, inUserPK });

            LocalSaveFirstRow = LocalConfigData.TableInfo.DefaultValues.TableColumns.SaveFirstRow;
            LocalTableColumnsNeeded = LocalConfigData.SubTableColumns[LocalSaveFirstRow].TableColumns;

            CommonCheckBeforeSave.ServerSideCheckAsync({
                inItemConfig, inUserData: LocalUserData,
                inConfigTableColumns: LocalTableColumnsNeeded, inObjectToInsert: inPostData, inUserPK
            }).then(PromiseData => {
                if (PromiseData.KTF) {
                    CommonSaveNormalFuncs.PrepareObjectBeforeSave({ inJsonConfig, inItemConfig, inUserPK }).then(PromiseDataFromBeforeSave => {
                        LocalReturnFromSave = CommonSaveNormalFuncs.SaveOnly({ inJsonConfig, inOriginalData: LocalUserData, inItemName: LocalItemName, inPostData: PromiseDataFromBeforeSave, inUserPK }).then(PromiseDataFromSave => {

                            if (PromiseDataFromSave.KTF) {
                                CommonSubTableSave.Save({ inJsonConfig, inItemConfig, inUserPK, inPostData, inInsertKey: LocalSaveFirstRow, inPK: PromiseDataFromSave.kPK }).then(PromiseDataFromSubTableSave => {
                                    resolve(PromiseDataFromSave);
                                }).catch(PromiseErrorFromSubTableSave => {
                                    resolve(PromiseDataFromSave);
                                });
                            };
                        }).catch(reject);
                    }).catch(reject);
                } else {
                    reject(PromiseData);
                }
            }).catch();
        };
    });
};

module.exports = { Save };
