let CommonFromFromJson = require("../../PullDataFromFile/FromJson");
let CommonFromToJson = require("../../PushDataFromFile/FromJson");
let CommonFromMaxPk = require("./MaxPk");

let StartFunc = async ({ inDataPK, ReportName, inVoucherConsiderpk }) => {
    let jvarLocalDataPK = inDataPK;
    let jvarLocalReportName = ReportName;
    let jvarLocalinVoucherConsiderpk = inVoucherConsiderpk;
    let LocalReturnData = { KTF: false };


    let ComonFromJsonData = await CommonFromFromJson.StartFunc({ inDataPK: jvarLocalDataPK });

    if (ComonFromJsonData.KTF === false) {
        LocalReturnData.KReason = ComonFromJsonData.KReason;
        return await LocalReturnData;
    };

    let jvarLocalNewData = JSON.parse(JSON.stringify(ComonFromJsonData.JsonData));

    // console.log("hhhhhhhhh-----------", jvarLocalNewData[jvarLocalReportName].VouchersConsider);

    if (jvarLocalReportName in jvarLocalNewData) {


        // console.log("hhhhhhhhh : ", jvarLocalNewData[jvarLocalReportName].VouchersConsider);

        let jVarLocalFind = jvarLocalNewData[jvarLocalReportName].VouchersConsider.find(e => e.pk === parseInt(jvarLocalinVoucherConsiderpk));

        console.log("jVarLocalFind : ", jVarLocalFind);

        let jvarLocalFindVouchersConsider = JSON.parse(JSON.stringify(jVarLocalFind));

        let LocalFromMax = await CommonFromMaxPk.StartFunc({
            inDataPK: jvarLocalDataPK,
            ReportName: jvarLocalReportName
        });

        if (LocalFromMax.KTF === false) {
            LocalReturnData.KReason = LocalFromMax.KReason;
            return await LocalReturnData;
        };

        console.log("LocalFromMax : ", LocalFromMax);

        jvarLocalFindVouchersConsider.pk = LocalFromMax.MaxPk + 1;

        jvarLocalNewData[jvarLocalReportName].VouchersConsider.push(jvarLocalFindVouchersConsider);


        let jvarLocalPushData = await CommonFromToJson.StartFunc({
            inOriginalData: ComonFromJsonData.JsonData,
            inDataToUpdate: jvarLocalNewData,
            inDataPK: jvarLocalDataPK
        });

        if (jvarLocalPushData.KTF) {
            LocalReturnData.KTF = true;

        };

        return await LocalReturnData;


    };
    return await LocalReturnData;

};
let MockFunc = () => {
    StartFunc({ inDataPK: "1022", ReportName: "Sales", inVoucherConsiderpk: "30" })
};

// MockFunc();

module.exports = { StartFunc };