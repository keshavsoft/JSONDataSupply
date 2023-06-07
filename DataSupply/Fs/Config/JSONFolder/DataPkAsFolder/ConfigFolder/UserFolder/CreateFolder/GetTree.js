let CommongetDirectories = require("../../getDirectories");

let CommonMockAllow = require("../../../../../../../MockAllow.json");

let StartFunc = async ({ inDataPK }) => {
    let LocalinDataPK = inDataPK;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommongetDirectories = await CommongetDirectories.AsObject({ inDataPK: LocalinDataPK });

    LocalReturnData.JsonData = LocalFromCommongetDirectories;
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K712") {
        StartFunc({
            inFolderName: "Transactions",
            inDataPK: CommonMockAllow.DataPK
        }).then(PromiseData => {
            console.log("PromiseData : ", PromiseData.JsonData.Folders);
        });
    };
};
// localMockFunc();

module.exports = { StartFunc };