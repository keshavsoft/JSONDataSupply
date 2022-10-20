//let CommonKeshavSoftCrud = require("./CommonFuncs/Classes/KeshavSoftCrud");
let CommonPullData = require("../Fs/Reports/PullData");
let CommonPushData = require("../Fs/Reports/PushData");
let CommonTemplate = require("./Json/Reports/VouchersConsider.json");

let CommonSwapData = {
  LoopRecursiveObject: ({ inData, inJson }) => {
      if (inData !== undefined) {
          _.forOwn(inJson, (value, key) => {
              if (typeof value === 'object') {
                  if (key !== "DefaultValue") {
                      this.SwapData.LoopRecursiveObject({ inData: inData[key], inJson: value });
                  };
              } else {
                  if (inData.hasOwnProperty(key)) {
                      inData[key] = value;
                  };
              }
          });
      };
  },
  CallLoopStart: ({ inData, inJson }) => {
      if (typeof inJson === 'object') {
          this.SwapData.LoopRecursiveObject({ inData, inJson });
      }
  }
};

let Fix = async ({ inReportName, inDataPk }) => {
  if (inDataPk > 0) {
    let LocalDisplayDataFromReports = await CommonPullData.ReturnDataFromJson({ inUserPK: inDataPk });
    let LocalDatatoUpdate = JSON.parse(JSON.stringify(LocalDisplayDataFromReports));
    let LocalReportDataNeeded = LocalDatatoUpdate[inReportName];
    let LocalReturnObject = { KTF: false };

    LocalReportDataNeeded.VouchersConsider = LocalReportDataNeeded.VouchersConsider.map(LoopElement => {
      return CommonSwapData.CallLoopStart({
        inData: LoopElement,
        inJson: CommonTemplate
      });
    });

    LocalReturnObject = await CommonPushData.PushDataAsync({
      inUserPK: inDataPk,
      inDataToUpdate: LocalDatatoUpdate,
      inOriginalData: LocalDisplayDataFromReports
    });

    return await LocalReturnObject;
  };
};

module.exports = { Fix };