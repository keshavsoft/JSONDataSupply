let CommonAccounts = require("../../../Fs/Config/Folders/Files/Items/PullData/FromDataFolder/Pull");
let CommonFromAsObject = require("../../../Fs/Config/Folders/Files/Items/PullData/FromDataFolder/PullFuncs/AsObject");

let ForProductHsn = async ({ inInvGridData, inDataPk }) => {
    let LocalGroup8Code;

    let LocalFromProductGroup8Names = await CommonFromAsObject.FromFolderAndFileAsObject({
        inFolderName: "Masters", inFileNameWithExtension: "ProductGroup8Names.json", inItemName: "ProductGroup8Names",
        inDataPK: inDataPk
    });

    if ((LocalFromProductGroup8Names === undefined) === false) {
        for (const property in inInvGridData) {
            LocalGroup8Code = inInvGridData[property].acc_cod11;

            if (LocalGroup8Code in LocalFromProductGroup8Names) {
                inInvGridData[property].ProductGroup8Name = LocalFromProductGroup8Names[LocalGroup8Code].ProductGroup8Name;
            };
        };
    };

    return await inInvGridData;
};

let ForProductName = async ({ inInvGridData, inDataPk }) => {
    let LocalProductCode;
    let LocalProductName;

    let LocalFromProducts = await CommonFromAsObject.FromFolderAndFileAsObject({
        inFolderName: "Masters", inFileNameWithExtension: "Products.json", inItemName: "Products",
        inDataPK: inDataPk
    });

    if ((LocalFromProducts === undefined) === false) {
        for (const property in inInvGridData) {
            LocalProductCode = inInvGridData[property].ProductCode;

            if (LocalProductCode in LocalFromProducts) {
                console.log("ssssssss : ", LocalFromProducts[LocalProductCode]);
                LocalProductName = LocalFromProducts[LocalProductCode].ProductName;

                inInvGridData[property].ProductName = LocalProductName;
                inInvGridData[property].acc_cod11 = LocalFromProducts[LocalProductCode].acc_cod11;
            };
        };
    };

    return await inInvGridData;
};

let ForGridAccount = async ({ inInvGridData, inDataPk }) => {
    let LocalReturnObject = { KTF: false, KMessage: "", DataFromServer: "" };
    let LocalTax;
    let LocalGridCode;

    let LocalFromAccounts = await CommonFromAsObject.FromFolderAndFileAsObject({
        inFolderName: "Masters", inFileNameWithExtension: "Accounts.json", inItemName: "Accounts",
        inDataPK: inDataPk
    });

    if ((LocalFromAccounts === undefined) === false) {
        for (const property in inInvGridData) {
            LocalGridCode = inInvGridData[property].InvGridAccountCode;

            if (LocalGridCode in LocalFromAccounts) {
                LocalTax = LocalFromAccounts[LocalGridCode].tax;

                console.log("LocalGridCode : ", LocalGridCode, LocalTax);

                inInvGridData[property].TaxPer = LocalTax;
            };
        };
    };

    return await inInvGridData;
};

module.exports = {
    ForGridAccount,
    ForProductName,
    ForProductHsn
}