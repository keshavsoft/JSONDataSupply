let CommonAbsolutePath = require("../../Fs/DataPath");
const fs = require("fs");

let InHtmlName = ({ inDataPK, inReportName }) => {
  let LocalDataPK = inDataPK;
  console.log("inDataPk : ",LocalDataPK);
  if (LocalDataPK > 0) {
    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalFolderPath = `${GlobalDataPath}/${LocalDataPK}/Html/Reports/${inReportName}.html`;
    const LocalFileData = fs.readFileSync(LocalFolderPath);
    console.log("LocalFileData : ",LocalFileData);
    return LocalFileData;
  }
};

//DisplayJson({ inUserPK: 17, inReportName: "NormalLedger2.html" });

module.exports = { InHtmlName };
