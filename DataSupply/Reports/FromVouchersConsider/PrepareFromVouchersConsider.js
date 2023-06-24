let GlobalCommonPullData = require("../../Fs/Reports/PullData");
let GlobalPullDataFromVouchersConsiderOnly = require("../CommonFuncs/PullDataFromVouchersConsiderOnly");
let CommonMock = require("../../MockAllow.json");

let PrepareLedgerAutoJsonWithItemName = ({ inLedgerName, inUserPK }) => {
    let LocalLedgerAutoJson = GlobalCommonPullData.ReturnDataFromJson({ inUserPK });
    let LocalLedgerAutoJsonWithItemName = LocalLedgerAutoJson[inLedgerName];

    return LocalLedgerAutoJsonWithItemName;
};

let ReturnAsTable = async ({ inLedgerName, inUserPK }) => {
    let LocalDataNeeded;
    let LocalReturnObject = { KTF: true, KMessage: "", DataFromServer: "" };

    if ((inUserPK > 0) === false) {
        LocalReturnObject.KReason = `${inUserPK} data folder not found!`;
    };

    let LocalLedgerAutoJsonWithItemName = PrepareLedgerAutoJsonWithItemName({ inLedgerName, inUserPK });
    //  console.log("LocalLedgerAutoJsonWithItemName : ", LocalLedgerAutoJsonWithItemName);
    LocalDataNeeded = await GlobalPullDataFromVouchersConsiderOnly.FromVouchersConsiderOnly({
        inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName,
        inUserPK
    });

    LocalReturnObject.KTF = true;
    LocalReturnObject.DataFromServer = LocalDataNeeded;

    //resolve({ KTF: true, KMessage: "", "DataFromServer": LocalDataNeeded });

    return await LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KR24') {
        ReturnAsTable({ inLedgerName: "BankWithdrawals", inUserPK: CommonMock.DataPK }).then(PromiseData => {
            console.log("PromiseData : ", PromiseData);
        });
    };
};

module.exports = { ReturnAsTable };
