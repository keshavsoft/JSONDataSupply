let CommonPullData = require("../../PullData");

let startfunc = ({ inDataPk }) => {
  let LocalReturnObject = { KTF: false, KReason: "" };

  let LocalReturnData = {
    Reports: {},
  };

  let LocalData = CommonPullData.ReturnDataFromJson({ inUserPK: inDataPk });
  let LocalReportsArray = Object.keys(LocalData);
  LocalReturnObject.KTF = true;
  LocalReturnObject.JsonData = LocalReportsArray;

  return LocalReturnObject;
};

module.exports = {
  startfunc,
};
