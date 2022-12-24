let CommonFromJson = require("../PullDataFromFile/FromJson");

let StartFunc = ({ inDataPK }) => {
    let LocalCommonFromJson = CommonFromJson.StartFunc({ inDataPK });

    // console.log("aaaaaaaaaaa : ", LocalCommonFromJson);
    if (LocalCommonFromJson.KTF === false) {
        LocalReturnData.KReason = LocalCommonFromJson.KReason;
        return LocalReturnData;
    };

    console.log("LocalCommonFromJson------ : ", LocalCommonFromJson.JsonData.Firm);

    return {
        FirmName: LocalCommonFromJson.JsonData.Firm.FirmName,
        FromDate: LocalCommonFromJson.JsonData.Firm.FromDate,
        ToDate: LocalCommonFromJson.JsonData.Firm.ToDate,
        AssYear: LocalCommonFromJson.JsonData.Firm.AssYear,
        FinYear: LocalCommonFromJson.JsonData.Firm.FinYear,
        PAN: LocalCommonFromJson.JsonData.Firm.PAN
    };
    //console.log("LocalCommonFromJson : ", LocalCommonFromJson.JsonData);
};

let LocalMockFroStartFunc = () => {
    let result = StartFunc({ inDataPK: 201 });
    console.log("result : ", result);
};

//LocalMockFroStartFunc();

module.exports = { StartFunc };