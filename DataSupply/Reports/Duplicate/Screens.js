let _ = require("lodash");
let debug = require("debug")("KS29");
let GlobalUserNameToPK = require("../../Users/NameToPK");
let CommonPullDataReports = require("../../../CommonData/Fs/PullData/Reports");
let CommonPushDataReports = require("../../../CommonData/Fs/PushData/Reports");

exports.Single = ({ inJsonConfig, inItemName, inFromName, inToName, inUserName }) => {
    let LocalUserPK = GlobalUserNameToPK.UserNameToPKRet({ inUserName });
    if (LocalUserPK > 0) {
        let LocalDataFromJSON = CommonPullDataReports.PullDataReport({ inJsonConfig, inUserPK: LocalUserPK });
        let LocalUpdatedJson = JSON.parse(JSON.stringify(LocalDataFromJSON));
        let LocalVouchersConsiderArray = LocalUpdatedJson[inItemName]["VouchersConsider"];
        let LocalVouchersConsiderObjectNeeded = _.find(LocalVouchersConsiderArray, { pk: parseInt(inFromName) })

        let LocalNewInsertedData = JSON.parse(JSON.stringify(LocalVouchersConsiderObjectNeeded));
        let LocalNewColumnpk = Math.max(...LocalVouchersConsiderArray.map(Loopitem => parseInt(Loopitem.pk))) + 1;
        LocalNewInsertedData.pk = LocalNewColumnpk;
        LocalNewInsertedData.ItemName = inToName;
        LocalVouchersConsiderArray.push(LocalNewInsertedData);

        CommonPushDataReports.PushDataReport({ inJsonConfig, inUserPK: LocalUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedJson }).then((PromiseData) => {
        }).catch((PromiseError) => {

        });
    };

};