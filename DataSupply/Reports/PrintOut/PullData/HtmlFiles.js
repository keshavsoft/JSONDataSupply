let CommonFromRowPK = require("../../../Fs/Config/FirmDetailsJson/Config/Html/ForPrint/Files");

let StartFunc = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = { KTF: false, JsonData: "", CreatedLog: {}, KReason: "" };

    if (LocalDataPK > 0) {
        let LocalFromPrint = await CommonFromRowPK.ForPrint({ inDataPK: LocalDataPK });
        LocalReturnObject.KReason = LocalFromPrint.KReason;

        if (LocalFromPrint.KTF) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.JsonData = LocalFromPrint.JsonData;
        }
    };

    return await LocalReturnObject;
};

let MockFuncStartFunc = () => {
    StartFunc({ inDataPK: 1022 }).then((PromiseData) => {
        console.log("PromiseData:", PromiseData);
    });
};

module.exports = { StartFunc };