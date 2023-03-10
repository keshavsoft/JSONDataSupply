let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../PullDataFromFile/FromJson");
let CommonFromPushData = require("../../../PushDataFromFile/FromJson");

let Update = async ({ inDataPK, inReportName, inTableColumnsPk, BodyAsJson }) => {
    const LocalDataToUpdate = (({ DisplayName, DataAttribute, CreateNew, Insert, ShowInTable }) => ({ DisplayName, DataAttribute, CreateNew, Insert, ShowInTable }))(BodyAsJson);
    let LocalinDataPK = inDataPK;
    let LocalReportName = inReportName;
    let LocalinTableColumnsPk = parseInt(inTableColumnsPk);

    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.StartFunc({
        inDataPK: LocalinDataPK
    });

    if (LocalFromPullData.KTF === false) {
        LocalReturnObject.KReason = LocalFromPullData.KReason;
        return LocalReturnObject;
    };
    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (LocalReportName in LocalNewData) {
        if ("TableColumns" in LocalNewData[LocalReportName]) {
            let LocalFilterObject = {};
            LocalFilterObject.pk = LocalinTableColumnsPk;
            LocalFindColumnObject = _.find(LocalNewData[LocalReportName].TableColumns, LocalFilterObject);


            LocalFindColumnObject.DisplayName = LocalDataToUpdate.DisplayName;
            LocalFindColumnObject.DataAttribute = LocalDataToUpdate.DataAttribute;
            LocalFindColumnObject.CreateNew = LocalDataToUpdate.CreateNew;
            LocalFindColumnObject.Insert = LocalDataToUpdate.Insert;
            LocalFindColumnObject.ShowInTable = LocalDataToUpdate.ShowInTable;


            LocalFromUpdate = await CommonFromPushData.StartFunc({
                inDataPK: LocalinDataPK,
                inDataToUpdate: LocalNewData,
                inOriginalData: LocalFromPullData.JsonData
            });

            if (LocalFromUpdate.KTF) {
                LocalReturnObject.KTF = true;
            };

            return await LocalReturnObject;

        };
    };


    return await LocalReturnObject;
};
let MockFunc = () => {
    Update({
        inDataPK: 1024,
        inReportName: "Purchases",
        inTableColumnsPk: 1
    }).then((PromiseData) => {
        console.log("PromiseData--", Object.keys(PromiseData));
    })
};
// MockFunc();

module.exports = {
    Update
};