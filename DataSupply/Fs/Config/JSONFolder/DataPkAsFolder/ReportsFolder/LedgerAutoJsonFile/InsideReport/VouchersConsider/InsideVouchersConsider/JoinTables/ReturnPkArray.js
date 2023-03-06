let CommonFromFromJson = require("../../../../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK, ReportName, VoucherConsiderPK }) => {
    let jvarLocalDataPK = inDataPK;
    let localReportName = ReportName;
    let LocalReturnData = { KTF: false };
    let localVoucherConsiderPK = VoucherConsiderPK;

    let ComonFromJsonData = await CommonFromFromJson.StartFunc({ inDataPK: jvarLocalDataPK });

    if (ComonFromJsonData.KTF === false) {
        LocalReturnData.KReason = ComonFromJsonData.KReason;
        return await LocalReturnData;
    };

    let jvarLocalNewData = JSON.parse(JSON.stringify(ComonFromJsonData.JsonData));

    if (localReportName in jvarLocalNewData) {
        let LocalVouchersConsiderFind = jvarLocalNewData[localReportName].VouchersConsider.find(e => e.pk === parseInt(localVoucherConsiderPK));
        if ("JoinTables" in LocalVouchersConsiderFind) {
            let LocalJoinTablesFind = LocalVouchersConsiderFind.JoinTables.map(e => parseInt(  Object.keys( e)[0].substring(2)));
            const max = LocalJoinTablesFind.reduce((a, b) => { return Math.max(a, b) });
            // console.log("max:",max);
         
            
            LocalReturnData.DataAsMaxString = `JT${max+1}`;


            // for (let key in LocalJoinTablesFind) {
            //     if (LocalJoinTablesFind.hasOwnProperty(key)) {
            //         let localsubstr = key.substring(2);
            //         // console.log("localsubstr:", localsubstr);
            //         LocalReturnData.DataAsMaxString = localsubstr;


            //     };
            // };
            LocalReturnData.KTF = true;

        };
    };

    return await LocalReturnData;
};

let MockFunc = () => {
    let findData = StartFunc({ inDataPK: "1022", ReportName: "StockBook", VoucherConsiderPK: 20 }).then((promseData) => {
        console.log("promseData--", promseData);
    });
};
// MockFunc();

module.exports = { StartFunc };