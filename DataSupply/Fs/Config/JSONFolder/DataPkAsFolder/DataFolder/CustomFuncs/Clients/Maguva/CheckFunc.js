let _ = require("lodash");
let CommonFromPurchase = require("./FromPurchase");
let CommonFromQrCodes = require("./FromQrCodes");

let StartFunc = ({ inPurchasePK, inDataPk }) => {

    let localDatapk = inDataPk;
    let LocalPurchasesData = CommonFromPurchase.StartFunc({ inDataPk: localDatapk });
    let LocalQrCodeData = CommonFromQrCodes.StartFunc({ inDataPk: localDatapk });

    let LocalReturnObject = {};
    LocalReturnObject.KTF = false;
    LocalReturnObject.KReason = "";
    LocalReturnObject.KResult = [];

    let LocalGetKey = "VouchersName";

    if (("KTF" in LocalQrCodeData) === false || LocalQrCodeData.KTF === false) {
        LocalReturnObject.KReason = "";
        return LocalReturnObject;
    };

    if ((Object.values(LocalQrCodeData.JsonData).map(e => e.PurchasePk).find(e => e === inPurchasePK) === undefined) === false) {
        LocalReturnObject.KReason = "QrCodes already raised!";
        return LocalReturnObject;
    };

    let LocalFromGetKey = _.get(LocalPurchasesData.JsonData, LocalGetKey);

    if ((inPurchasePK in LocalFromGetKey) === false) {
        LocalReturnObject.KReason = "PK not found in Purchases!";
        return LocalReturnObject;
    };
    let LocalPurchasePK = LocalFromGetKey[inPurchasePK];

    LocalReturnObject.KTF = true;
    LocalReturnObject.PurchasePk = LocalPurchasePK;

    return LocalReturnObject;
};

module.exports = { StartFunc };
