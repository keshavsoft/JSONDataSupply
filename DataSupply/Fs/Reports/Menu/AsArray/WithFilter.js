let CommonPullData = require("../../PullData");
let CommonFilesAsArray = require("../../../../Reports/CheckHtml/FilesAsArray");

let startfunc = ({ inDataPK }) => {
  let LocalReturnObject = { KTF: false, KReason: "" };
  let LocalReturnData = {
    Reports: {},
  };

  let LocalData = CommonPullData.ReturnDataFromJson({ inUserPK: inDataPK });
  let LocalReportsArray = Object.keys(LocalData);

  let LocalFilesAsArray = CommonFilesAsArray.FromDataPK({ inDataPK });
  let LocalFilesWithOutExtension = LocalFilesAsArray.map(element => element.split(".")[0]);
  let difference = LocalFilesWithOutExtension.filter(x => LocalReportsArray.includes(x));

  LocalReturnObject.KTF = true;
  LocalReturnObject.JsonData = difference;
  //return Object.keys(LocalData);

  return LocalReturnObject
};

module.exports = {
  startfunc,
};
