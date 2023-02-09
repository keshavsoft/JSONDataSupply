let CommonFromFromJson = require("../../PullDataFromFile/FromJson");
let CommonFromPushData = require("../../PushDataFromFile/FromJson");


let StartFunc = async ({ inDataPK, ReportName, CloneName }) => {
    let jvarLocalinDataPK = inDataPK;
    let jvarLocalReportName = ReportName;
    let jvarLocalCloneName = CloneName;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommnLocalFromJson = await CommonFromFromJson.StartFunc({ inDataPK: jvarLocalinDataPK });

    if (CommnLocalFromJson.KTF === false) {
        LocalReturnData.KReason = CommnLocalFromJson.KReason;
        return await LocalReturnData;
    };

    let LocalNewData = JSON.parse(JSON.stringify(CommnLocalFromJson.JsonData));
    LocalReturnData.JsonData = LocalNewData;

    if (jvarLocalReportName in LocalNewData) {
        if ((jvarLocalCloneName in LocalNewData) === false) {
            let jvarLocalNewData = JSON.parse(JSON.stringify(LocalNewData[jvarLocalReportName]))
            LocalReturnData.JsonData[jvarLocalCloneName] = jvarLocalNewData;

            let LocalFromUpdate = CommonFromPushData.StartFunc({
                inOriginalData: CommnLocalFromJson.JsonData,
                inDataToUpdate: LocalReturnData.JsonData,
                inDataPK: jvarLocalinDataPK
            });
            if (LocalFromUpdate.KTF) {
                LocalReturnData.KTF = true
            };
            return await LocalReturnData;

        };

    };

    return await LocalReturnData;
};
let MockFunck = () => {
    StartFunc({ inDataPK: "1022", ReportName: "Ledger", CloneName: "Ledger3" });
};
// MockFunck();

module.exports = { StartFunc };