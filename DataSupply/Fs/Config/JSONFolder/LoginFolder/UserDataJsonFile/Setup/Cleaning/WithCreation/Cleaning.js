const fs = require("fs-extra");
// let CommonAbsolutePath = require("../../../DataPath");

let CommonMock = require("../../../../../../../../MockAllow.json");
let CommonInsert = require("../../../Insert/UserNamePassword");

let StartFunc = ({ inUserName, inPassword }) => {
    let LocalPullData = CommonInsert.StartFunc({ inUserName, inPassword });

    let LocalReturnObject = { ...LocalPullData };
    LocalReturnObject.KTF = false;

    if (LocalPullData.KTF === false) {
        return LocalReturnObject;
    };

    LocalReturnObject.KTF = true;
    
    return LocalReturnObject;
};

// let StartFunc1 = async ({ inUserPK }) => {
//     let LocalReturnData = { KTF: false, KReason: "" };
//     try {
//         let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
//         let LocalFolderPath = `${GlobalDataPath}/${inUserPK}`
//         let LocalFromPath = `${GlobalDataPath}/TemplateDatas/ForLaundry/3016`;

//         if (fs.existsSync(LocalFolderPath)) {
//             LocalReturnData.KReason = "Data is already present on the server";
//         } else {
//             fs.copySync(LocalFromPath, LocalFolderPath);

//             LocalReturnData.KTF = true;
//         };
//     } catch (error) {
//         console.log("error : ", error);
//     };

//     return await LocalReturnData;
// };

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K5') {
        let LocalMockData = require('./Cleaning.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };