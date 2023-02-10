let CommonFromJson = require("../PullDataFromFile/FromJson");

let StartFunc1 = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromRepotsJson = await CommonFrom.StartFunc({ inDataPK });

    if (CommonFromRepotsJson.KTF === false) {
        LocalReturnData.KReason = CommonFromRepotsJson.KReason;
        return await LocalReturnData;
    };

    // LocalReturnData.JsonObject = JSON.parse(JSON.stringify(CommonFromRepotsJson.JsonData));
    LocalReturnData.JsonObject = CommonFromRepotsJson.JsonData;

    Object.entries(CommonFromRepotsJson.JsonData).forEach(([key, value]) => {
        LocalReturnData.JsonObject.Reports = {};

        LocalReturnData.JsonObject.Reports[key] = {};

        console.log(`sss-- ${value.VouchersConsider}`);
    });

    LocalObjectToArray = Object.entries(CommonFromRepotsJson.JsonData);
    LocalObject = LocalObjectToArray.map(x => {
        return { ReportName: x }
    });
    LocalReturnData.JsonObject = LocalObject;
    LocalReturnData.KTF = true;

    return await LocalReturnData;
};
let StartFunc2 = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromRepotsJson = await CommonFromJson.StartFunc({ inDataPK });

    if (CommonFromRepotsJson.KTF === false) {
        LocalReturnData.KReason = CommonFromRepotsJson.KReason;
        return await LocalReturnData;
    };
    LocalReturnData.JsonObject = CommonFromRepotsJson.JsonData;

    LocalObjectToArray = Object.keys(CommonFromRepotsJson.JsonData);
    let LocalObject = LocalObjectToArray.map(x => {
        return {
            ReportName: x,
            VouchersConsider: CommonFromRepotsJson.JsonData[x]
        };
    });
    let VouchersConsider = {};

    let check = Object.entries(LocalObject).forEach(([key, value]) => {
        VouchersConsider.ab = JSON.parse(JSON.stringify(value));

        Object.entries(value.VouchersConsider).forEach(([key, value]) => {
            VouchersConsider.ab[key] = JSON.parse(JSON.stringify(value));

            Object.entries(value).forEach(([key, value]) => {
                VouchersConsider.ab[key].VouchersConsider[key] = JSON.parse(JSON.stringify(value));
            });

        });



    });
    console.log("VouchersConsider", VouchersConsider);


    LocalReturnData.JsonObject = LocalObject;
    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFromJson = await CommonFromJson.StartFunc({ inDataPK });

    if (CommonFromFromJson.KTF === false) {
        LocalReturnData.KReason = CommonFromFromJson.KReason;
        return await LocalReturnData;
    };

    LocalReturnData.ReportsObject = {};

    LocalObjectToArray = Object.keys(CommonFromFromJson.JsonData);
    LocalObjectToArray.forEach(x => {

        LocalReturnData.ReportsObject[x] = {
            ReportName: x,
            VouchersConsiderObject: {}
        };

        // return {
        //     ReportName: x,
        //     VouchersConsider: CommonFromFromJson.JsonData[x].VouchersConsider
        // }
    });


    Object.entries(LocalReturnData.ReportsObject).forEach(([key, value]) => {
        CommonFromFromJson.JsonData[key].VouchersConsider.forEach(x => {
            value.VouchersConsiderObject[x.pk] = x;
        });
    });

    // LocalReturnData.JsonObject = LocalObject;
    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

let MockFunc = async () => {
    let findData = StartFunc({ inDataPK: "1022" }).then((PromiseData) => {
        console.log("PromiseData", PromiseData.ReportsObject);
    });
};
// MockFunc();

module.exports = { StartFunc };