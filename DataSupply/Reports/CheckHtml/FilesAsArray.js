let CommonAbsolutePath = require("../../Fs/DataPath");
const fs = require("fs");

let FromDataPK = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnArray = [];

    if (LocalDataPK > 0) {
        let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
        let LocalFolderPath = `${GlobalDataPath}/${LocalDataPK}/Html/Reports`;

        const LocalFilesArray = fs.readdirSync(LocalFolderPath);
        LocalReturnArray = LocalFilesArray.filter((elm) => elm.match(/.*\.(html?)/ig));

        return LocalReturnArray;
        
    };
};

//DisplayJson({ inUserPK: 17, inReportName: "NormalLedger2.html" });

module.exports = { FromDataPK };