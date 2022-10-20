let CommonPullDataReports = require("../../../Fs/Reports/PullData");
let CommonPushDataReports = require("../../../Fs/Reports/PushData");
//let CommonPushDataReports = require("../../../CommonData/Fs/PushData/Reports");

exports.Single = async ({ inJsonConfig, inItemName, inFromName, inToName, inUserPK }) => {
  if (inUserPK > 0) {
    let LocalDataFromJSON = CommonPullDataReports.ReturnDataFromJson({ inJsonConfig, inUserPK });
    let LocalUpdatedJson = JSON.parse(JSON.stringify(LocalDataFromJSON));
    let LocalItemNeeded = LocalUpdatedJson[inItemName];
    let LocalVouchersConsider = LocalItemNeeded.VouchersConsider;
    let LocalFromData = LocalVouchersConsider.find(element => element.pk === parseInt(inFromName));
    let LocalToData = JSON.parse(JSON.stringify(LocalFromData));

    LocalToData.pk = LocalGeneratePK({ inArray: LocalVouchersConsider });
    LocalToData.ItemName = inToName;

    LocalVouchersConsider.push(LocalToData);
    //LocalUpdatedJson[inToName] = LocalDataFromJSON[inFromName];

    let LocalReturnData = await CommonPushDataReports.PushDataAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedJson });
    return LocalReturnData;
  };
};

let LocalGeneratePK = ({ inArray }) => {
  let LocalArray = inArray.map(element => {
    return element.pk;
  });

  let LocalNewColumnpk = Math.max(...LocalArray) + 1;
  
  return LocalNewColumnpk;
};