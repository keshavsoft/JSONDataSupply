const fs = require("fs-extra");

let CommonMock = require("../../../../../../../../MockAllow.json");
let CommonFind = require("../../../Find/Find");
let CommonFirmDetailsJsonFile = require("../../../../../DataPkAsFolder/FirmDetailsJsonFile/PullDataFromFile/FromJson");

let StartFunc = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalPullData = CommonFind.StartFunc({ inDataPK: LocalDataPK });

    let LocalReturnObject = { ...LocalPullData };
    LocalReturnObject.KTF = false;

    if (LocalPullData.KTF === false) {
        delete LocalReturnObject.JsonData;
        return LocalReturnObject;
    };

    try {
        let GlobalDataPath = LocalReturnObject.KDataJSONFolderPath;
        let LocalFolderPath = `${GlobalDataPath}/${LocalDataPK}`
        let LocalFromPath = `${GlobalDataPath}/TemplateDatas/Blank/1025`;

        if (fs.existsSync(LocalFolderPath)) {
            LocalReturnObject.KReason = "Data is already present on the server";
        } else {
            fs.copySync(LocalFromPath, LocalFolderPath);

            let LocalFromFirmDetails = CommonFirmDetailsJsonFile.StartFunc({ inDataPK: LocalDataPK });
            
            LocalReturnObject = { ...LocalFromFirmDetails };
            LocalReturnObject.KTF = false;
        
            if (LocalFromFirmDetails.KTF === false) {
                delete LocalReturnObject.JsonData;
                return LocalReturnObject;
            };

            LocalReturnObject.KTF = true;
           // delete LocalReturnObject.JsonData;
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K24') {
        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };