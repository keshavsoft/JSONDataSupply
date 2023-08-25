const fs = require("fs-extra");

let CommonMock = require("../../../../../../../../MockAllow.json");
let CommonFind = require("../../../Find/Find");

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
        let LocalFromPath = `${GlobalDataPath}/TemplateDatas/ForLaundry/3016`;

        if (fs.existsSync(LocalFolderPath)) {
            LocalReturnObject.KReason = "Data is already present on the server";
        } else {
            fs.copySync(LocalFromPath, LocalFolderPath);

            LocalReturnObject.KTF = true;
            delete LocalReturnObject.JsonData;
        };
    } catch (error) {
        console.log("error : ", error);
    };

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
    if (CommonMock.MockKey === 'K24') {
        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };