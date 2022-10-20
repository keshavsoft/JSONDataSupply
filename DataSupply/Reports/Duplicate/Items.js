let CommonPullDataReports = require("../../Fs/Reports/PullData");
let CommonPushDataReports = require("../../Fs/Reports/PushData");

exports.Single = async ({ inJsonConfig, inFromName, inToName, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalDataFromJSON = CommonPullDataReports.ReturnDataFromJson({ inJsonConfig, inUserPK });
        let LocalUpdatedJson = JSON.parse(JSON.stringify(LocalDataFromJSON));
        
        LocalUpdatedJson[inToName] = LocalDataFromJSON[inFromName];

        return await CommonPushDataReports.PushDataAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedJson });

    };
};