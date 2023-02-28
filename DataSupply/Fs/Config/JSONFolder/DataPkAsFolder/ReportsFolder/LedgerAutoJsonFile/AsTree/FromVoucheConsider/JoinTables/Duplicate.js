let CommonFromJson = require("../../../PullDataFromFile/FromJson");



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

    });


    Object.entries(LocalReturnData.ReportsObject).forEach(([key, value]) => {
        CommonFromFromJson.JsonData[key].VouchersConsider.forEach(x => {
            // console.log("x",x);
            value.VouchersConsiderObject[x.pk] = x;
        });

    });
    PrepareColumnsFromVouchersConsider({
        inReportsObject: LocalReturnData.ReportsObject,
        inOriginalData: CommonFromFromJson.JsonData
    })

    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

let PrepareColumnsFromVouchersConsider = ({ inReportsObject, inOriginalData }) => {

    let LocalinObject = inReportsObject

    Object.entries(LocalinObject).forEach(([Reportkey, Reportvalue]) => {

        Object.entries(Reportvalue.VouchersConsiderObject).forEach(([Voucherkey, Vouchervalue]) => {

            Vouchervalue.JoinTablesObject = {};
            Vouchervalue.JoinTables.forEach(x => {
                Vouchervalue.JoinTablesObject[x.JT1] = x;
                // console.log("x",Vouchervalue.JoinTablesObject[x.JT1]);

            });
            delete Vouchervalue.Columns;
            delete Vouchervalue.ReportConfig;
            delete Vouchervalue.ColumnsObject;
            delete Vouchervalue.JoinTablesColumns;

        });
    });


};

let MockFunc = async () => {
    let findData = StartFunc({ inDataPK: "1022" }).then((PromiseData) => {
        // console.log("PromiseData", PromiseData.ReportsObject.Purchases.VouchersConsiderObject);
    });
};

// MockFunc();

module.exports = { StartFunc };