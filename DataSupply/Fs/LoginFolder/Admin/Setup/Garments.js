const fs = require("fs-extra");
let CommonAbsolutePath = require("../../../DataPath");

let CommonMock = require("../../../../MockAllow.json");

let StartFunc = async ({ inUserPK }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    try {
        let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
        let LocalFolderPath = `${GlobalDataPath}/${inUserPK}`
        let LocalFromPath = `${GlobalDataPath}/TemplateDatas/ForGarments/902`;

        if (fs.existsSync(LocalFolderPath)) {
            LocalReturnData.KReason = "Data is already present on the server";
        } else {
            fs.copySync(LocalFromPath, LocalFolderPath);

            LocalReturnData.KTF = true;
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};
if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSV') {
        let LocalMockData = require('./Garments.json');

        StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};
module.exports = { StartFunc };