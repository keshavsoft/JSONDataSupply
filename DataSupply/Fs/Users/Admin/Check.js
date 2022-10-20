let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");

let ForUserAndPassword = async ({ inUserName, inPassWord }) => {
    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
    let LocalUserData = fs.readFileSync(`${LocalDataPath}/Login/UserData.json`);
    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalUserDataJson = JSON.parse(LocalUserData);
    let LocalUserDataJsonData = LocalUserDataJson.data;
    let LocalRetPK = 0;
    
    Object.entries(LocalUserDataJsonData).forEach(
        ([key, value]) => {
            if (value.UserName === inUserName && value.PassWord === inPassWord) {
                LocalRetPK = key;
            };
        }
    );
    if (LocalRetPK > 0) {
        LocalReturnObject.kPK = LocalRetPK;
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

module.exports = { ForUserAndPassword };