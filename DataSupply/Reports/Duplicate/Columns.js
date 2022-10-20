let _ = require("lodash");
//let GlobalUserNameToPK = require("../../Users/NameToPK");
let CommonPullDataReports = require("../../Fs/Reports/PullData");
let CommonPushDataReports = require("../../Fs/Reports/PushData");

exports.Single = ({ inJsonConfig, inItemConfig, inFromName, inToName, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalItemName = inItemConfig.inItemName;
        let LocalPkName = parseInt(inItemConfig.inPkName);
        let localColumns = "Columns";
        let LocalDataFromJSON = CommonPullDataReports.ReturnDataFromJson({ inUserPK });
        let LocalUpdatedJson = JSON.parse(JSON.stringify(LocalDataFromJSON));

        let LocalVouchersConsiderArray = LocalUpdatedJson[LocalItemName]["VouchersConsider"];
        let LocalVouchersConsiderObjectNeeded = _.find(LocalVouchersConsiderArray, { pk: LocalPkName })

        let LocalColumnData = _.find(LocalVouchersConsiderObjectNeeded[localColumns], { pk: parseInt(inFromName) });

        let LocalNewColumnData = JSON.parse(JSON.stringify(LocalColumnData));
        let LocalNewColumnpk = Math.max(...LocalVouchersConsiderObjectNeeded[localColumns].map(Loopitem => parseInt(Loopitem.pk))) + 1;

        LocalNewColumnData.Name = inToName;
        LocalNewColumnData.DisplayColumn = inToName;
        LocalNewColumnData.pk = LocalNewColumnpk;
        LocalVouchersConsiderObjectNeeded[localColumns].push(LocalNewColumnData);

        CommonPushDataReports.PushDataAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedJson }).then((PromiseData) => {
        }).catch((PromiseError) => {

        });
    };
};