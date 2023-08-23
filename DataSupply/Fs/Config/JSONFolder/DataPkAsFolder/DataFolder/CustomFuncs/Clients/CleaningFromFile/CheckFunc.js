let _ = require("lodash");
let CommonFromPurchase = require("./FromPurchase");
let CommonFromQrCodes = require("./FromQrCodes");
let PurchasesKeysJson = require("./PurchasesKeys.json");

let StartFunc = ({ inPurchasePK, inFileNameOnly, inDataPk }) => {
    let LocalReturnObject = {};
    let LocalFileNameOnly = inFileNameOnly;
    let localDatapk = inDataPk;

    let LocalPurchasesData = CommonFromPurchase.StartFunc({
        inDataPk: localDatapk,
        inFileNameOnly: LocalFileNameOnly
    });

    let LocalQrCodeData = CommonFromQrCodes.StartFunc({
        inDataPk: localDatapk
    });

    LocalReturnObject = {
        ...LocalQrCodeData
    }
    LocalReturnObject.KTF = false;

    if (("KTF" in LocalQrCodeData) === false || LocalQrCodeData.KTF === false) {
        return LocalReturnObject;
    };

    LocalReturnObject.KTF = false;

    let LocalGetKey = "Orders";

    // if ((Object.values(LocalQrCodeData.JsonData).map(e => e.GenerateReference.ReferncePk).find(e => e === inPurchasePK) === undefined) === false) {
    //     LocalReturnObject.KReason = "QrCodes already raised!";
    //     return LocalReturnObject;
    // };

    if ((Object.values(LocalQrCodeData.JsonData).find(e => e.GenerateReference.ReferncePk === inPurchasePK && e.GenerateReference.FileNameOnly === LocalFileNameOnly) === undefined) === false) {
        LocalReturnObject.KReason = "QrCodes already raised!";
        return LocalReturnObject;
    };

    let LocalFromGetKey = _.get(LocalPurchasesData.JsonData, LocalGetKey);

    if ((inPurchasePK in LocalFromGetKey) === false) {
        LocalReturnObject.KReason = `PK : ${inPurchasePK} not found in Purchases ${PurchasesKeysJson.inFolderName} > ${PurchasesKeysJson.inFileNameOnly}.json > ${LocalGetKey}`;
        return LocalReturnObject;
    };

    let LocalPurchasePK = LocalFromGetKey[inPurchasePK];

    LocalReturnObject.KTF = true;
    LocalReturnObject.PurchasePk = LocalPurchasePK;

    return LocalReturnObject;
};

let LocalFuncCheck = ({ inPurchasePK, inFileNameOnly, inQrCodeData, inDataPk }) => {
    let LocalReturnObject = {};
    let LocalFileNameOnly = inFileNameOnly;
    let localDatapk = inDataPk;

    let LocalPurchasesData = CommonFromPurchase.StartFunc({
        inDataPk: localDatapk,
        inFileNameOnly: LocalFileNameOnly
    });

    let LocalQrCodeData = inQrCodeData;

    let LocalGetKey = "Orders";

    if ((Object.values(LocalQrCodeData.JsonData).find(e => e.GenerateReference.ReferncePk === inPurchasePK && e.GenerateReference.FileNameOnly === LocalFileNameOnly) === undefined) === false) {
        LocalReturnObject.KReason = "QrCodes already raised!";
        return LocalReturnObject;
    };

    let LocalFromGetKey = _.get(LocalPurchasesData.JsonData, LocalGetKey);

    if ((inPurchasePK in LocalFromGetKey) === false) {
        LocalReturnObject.KReason = `PK : ${inPurchasePK} not found in Purchases ${PurchasesKeysJson.inFolderName} > ${PurchasesKeysJson.inFileNameOnly}.json > ${LocalGetKey}`;
        return LocalReturnObject;
    };

    let LocalPurchasePK = LocalFromGetKey[inPurchasePK];

    LocalReturnObject.KTF = true;
    LocalReturnObject.PurchasePk = LocalPurchasePK;

    return LocalReturnObject;
};

module.exports = { StartFunc };
