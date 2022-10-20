let _ = require("lodash");

let CommonPullData = require("../PullData/FromJson");

let StartFunc = async ({ inUserName, inPassword, inFirmName }) => {
    let LocalUserName = inUserName;
    let LocalPassword = inPassword;
    let LocalFirmName = inFirmName;

    let LocalReturnData = { KTF: false, DirPath: "", FilePath: "", CreatedLog: {} };

    let LocalFromPullData = await CommonPullData.AsAsync();
    let LocalUserKeyNeeded = _.findKey(LocalFromPullData, { "UserName": LocalUserName, "PassWord": LocalPassword });

    console.log("LocalUserDataNeeded : ", LocalUserKeyNeeded);

    let LocalDataPK = _.findKey(LocalFromPullData[LocalUserKeyNeeded].ConnectedDatas, { "FirmName": LocalFirmName });
    LocalReturnData.kPK = LocalDataPK;
    LocalReturnData.KTF = true;

    console.log("LocalFindConnectedDatas : ", LocalFindConnectedDatas);

    return await LocalReturnData;
};

let LocalMockFuncStartFunc = async () => {
    console.log("ssssssss : ", await StartFunc({ inUserName: "ABS", inPassword: "ABS", inFirmName: "ABS IMPEX-CHENNAI" }));

};


// LocalMockFuncStartFunc().then(p => {

// })

module.exports = { StartFunc };