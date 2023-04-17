let _ = require("lodash");
let CommonGroupBy = require("../CommonFuncs/GroupByFuncs/GroupBy");
let CommonFromData = require("../../Fs/Config/Folders/Files/PullData/FromData");
let CommonPath = require("path");

let CommonGstSale = require("./Common/GstSale");

let CommonFirmDetails = require("../../Fs/Config/FirmDetailsJson/PullData/FromJson");

let CommonAbsolutePath = require("../../Fs/DataPath");
let fs = require("fs");

let StartFunc = async ({ inData, inItemName, inDataPk }) => {
    let LocalReturnData = [];
    let LocalFromInvGrid;
    let LocalInvGridData;

    if (inDataPk > 0) {
        LocalReturnData = JSON.parse(JSON.stringify(inData));
        LocalInvGridData = JSON.parse(JSON.stringify(LocalReturnData.InvGrid));

        LocalFromInvGrid = await LocalItemWiseFuncs.InvGridData({ inItemName, inData: LocalInvGridData, inDataPk });

        LocalReturnData.FirmHeading = LocalItemWiseFuncs.FirmHeading({ inPK: inDataPk });

        LocalReturnData.InvGrid = LocalFromInvGrid;
        LocalReturnData.TotalRow = LocalItemWiseFuncs.InvGridDataFooter({ inItemName, inData: LocalFromInvGrid });
        LocalReturnData.TaxData = LocalItemWiseFuncs.InvGridDataTax({ inItemName, inData: LocalFromInvGrid });
    };
    //   console.log("print : ", LocalReturnData);
    return { KTF: true, KMessage: "", DataFromServer: LocalReturnData };
};

let FromDataFolder = async ({ inData, inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalRetrunObject = { KTF: true, KReason: "", KMessage: "", DataFromServer: "" };
    let LocalFromCode;

    let LocalFolderName = inJsonConfig.inFolderName;
    let LocalFileName = CommonPath.parse(inJsonConfig.inJsonFileName).name;

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;

    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalModulesPath = `${LocalDataPath}/${inDataPK}/Config/${LocalFolderName}/${LocalFileName}/${LocalItemName}/${LocalScreenName}/PrepareDataForPrint`;
    console.log('22222222222 :LocalModulesPath : ', LocalModulesPath, fs.existsSync(`${LocalModulesPath}.js`));
    if (fs.existsSync(`${LocalModulesPath}.js`) === false) {
        LocalRetrunObject.KReason = "Code not found in KData!";
        return await LocalRetrunObject;
    };

    let LocalCode = require(LocalModulesPath);

    console.log('3333333 :LocalCode : ', LocalCode);

    LocalFromCode = await LocalCode.StartFunc({ inData, inDataPK });

    if (LocalFromCode.KTF === false) {
        LocalRetrunObject.KReason = LocalFromCode.KReason;
        return await LocalFromCode;
    };

    LocalRetrunObject.KTF = true;
    LocalRetrunObject.DataFromServer = LocalFromCode.DataFromServer;

    return await LocalRetrunObject;
    //return await LocalCode.StartFunc({ inData, inDataPK });
};

class LocalItemWiseFuncs {
    static InvGridData = async ({ inItemName, inData, inDataPk }) => {
        //let LocalReturnData = inData;
        let LocalReturnData;
        let LocalTax;
        console.log("inItemName : ", inItemName);
        switch (inItemName) {
            case "ExclusiveTax": case "CashTaxInvoice": case "CreditTaxInvoice":
                LocalReturnData = Object.values(inData).map(element => {
                    element.TotalAmount = ((element.Rate * (1 - (element.DisPer / 100))) * element.Qty) * (1 + (element.TaxPer / 100));

                    return element;
                });

                break;
            case "GST-SALE":
                LocalReturnData = await CommonGstSale.ForGridAccount({ inInvGridData: inData, inDataPk })
                LocalReturnData = await CommonGstSale.ForProductName({ inInvGridData: LocalReturnData, inDataPk })
                LocalReturnData = await CommonGstSale.ForProductHsn({ inInvGridData: LocalReturnData, inDataPk })
                LocalReturnData = Object.values(LocalReturnData).map(element => {
                    return element;
                });

                break;
            default:
                LocalReturnData = await this.CommonFuncs.InvGridData.DefaultFunc({ inData: Object.values(inData), inDataPk });

                break;
        };

        return await LocalReturnData;
    }

    static InvGridDataFooter = ({ inItemName, inData }) => {
        let LocalInData = JSON.parse(JSON.stringify(inData));
        let LocalReturnData;

        switch (inItemName) {
            case "ExclusiveTax": case "CashTaxInvoice": case "CreditTaxInvoice":
                let LocalTotalAmount = _.round(_.sum(_.map(LocalInData, "TotalAmount")), 2).toFixed(2);
                let LocalTotalAmountRounded = _.round(_.sum(_.map(LocalInData, "TotalAmount")), 0).toFixed(0);
                let LocalTotalQty = _.sum(_.map(LocalInData, "Qty"));
                let LocalRoundOff = 0;

                if (LocalTotalAmountRounded - LocalTotalAmount !== 0) {
                    LocalRoundOff = _.round(LocalTotalAmountRounded - LocalTotalAmount, 2).toFixed(2);
                }
                return {
                    TotalAmount: LocalTotalAmount,
                    noof: LocalTotalQty,
                    RoundOff: LocalRoundOff,
                    RoundedAmount: LocalTotalAmountRounded
                };

                break;
            case "InclusiveTax":
                return this.CommonFuncs.InvGridDataFooter.InclusiveTax({ inData: LocalInData });
                break;
            default:
                return this.CommonFuncs.InvGridDataFooter.DefaultFunc({ inData: LocalInData });
                break;
        };

        return LocalReturnData;
    }

    static InvGridDataTax = ({ inItemName, inData }) => {
        let LocalInData = JSON.parse(JSON.stringify(inData));
        let LocalReturnData;

        switch (inItemName) {
            case "ExclusiveTax": case "CashTaxInvoice": case "CreditTaxInvoice":
                return this.CommonFuncs.InvGridDataTax.ExclusiveTax({ inData: LocalInData });
                break;
            case "InclusiveTax":
                return this.CommonFuncs.InvGridDataTax.InclusiveTax({ inData: LocalInData });
                break;
            default:
                return this.CommonFuncs.InvGridDataTax.DefaultFunc({ inData: LocalInData });

                break;
        }

        return LocalReturnData;
    }

    static FirmHeading = ({ inPK }) => {
        let LocalFirmDetails = CommonFirmDetails.StartFunc({ inPK });
    };

    static CommonFuncs = {
        InvGridData: {
            DefaultFunc: async ({ inData, inDataPk }) => {
                let LocalMastersAccounts = await CommonFromData.AsJsonAsyncFromFolderAndFile({
                    inFolderName: "Masters",
                    inFileNameWithExtension: "Accounts.json",
                    inUserPK: inDataPk
                });
                let LocalKeyName = "Accounts";
                let LocalGridKey = "InvGridAccountCode";
                let LocalTaxKey = "tax";
                let LocalAccountsFindRow;
                let LocalReturnData;
                //   console.log("LocalMastersAccounts : ", LocalMastersAccounts);

                if (LocalKeyName in LocalMastersAccounts) {
                    LocalReturnData = inData.map(element => {
                        if (LocalGridKey in element) {
                            if (element[LocalGridKey] in LocalMastersAccounts[LocalKeyName]) {
                                LocalAccountsFindRow = LocalMastersAccounts[LocalKeyName][element[LocalGridKey]];

                                if (LocalTaxKey in LocalAccountsFindRow) {
                                    element.TaxPer = LocalAccountsFindRow[LocalTaxKey];
                                };
                            };
                        };

                        return element;
                    });
                };

                return LocalReturnData;
            }
        },
        InvGridDataFooter: {
            InclusiveTax: ({ inData }) => {
                let LocalTotalAmount = _.sum(_.map(inData, "Amount"));
                let LocalTotalQty = _.sum(_.map(inData, "Qty"));

                return { Amount: LocalTotalAmount, noof: LocalTotalQty };

            },
            DefaultFunc: ({ inData }) => {
                let LocalTotalAmount = _.sum(_.map(inData, "Amount"));
                let LocalTotalQty = _.sum(_.map(inData, "Qty"));

                return { Amount: LocalTotalAmount, noof: LocalTotalQty };
            }
        },
        InvGridDataTax: {
            ExclusiveTax: ({ inData }) => {
                let LocalTaxData = CommonGroupBy.SingleColumnAndMultipleDataRetruned({
                    inDataToSort: inData,
                    inGroupByColumn: "TaxPer",
                    inColumnsToGroupByAsFloat: ["TotalAmount", "TaxableAmount"]
                });

                LocalTaxData = LocalTaxData.map(element => {
                    if (typeof element.TaxPer === "string") {
                        element.TaxPer = parseFloat(element.TaxPer);
                    };

                    element.TaxableAmount = element.TaxableAmount;

                    element.Cgst = ((element.TotalAmount * (element.TaxPer / (100 + element.TaxPer))) / 2).toFixed(2);
                    element.Sgst = ((element.TotalAmount * (element.TaxPer / (100 + element.TaxPer))) / 2).toFixed(2);
                    //  element.gst  = element.Cgst + element.Sgst;
                    element.gst = ((element.TotalAmount * (element.TaxPer / (100 + element.TaxPer)))).toFixed(2);

                    element.Amount = element.TotalAmount;
                    // console.log("element : ", element);
                    return element;
                });

                return LocalTaxData;
            },
            InclusiveTax: ({ inData }) => {
                let LocalTaxData = CommonGroupBy.SingleColumnAndMultipleDataRetruned({
                    inDataToSort: inData,
                    inGroupByColumn: "TaxPer",
                    inColumnsToGroupByAsFloat: ["Amount"]
                });

                LocalTaxData = LocalTaxData.map(element => {
                    element.Cgst = ((element.Amount * (element.TaxPer / (100 + element.TaxPer))) / 2).toFixed(2);
                    element.Sgst = ((element.Amount * (element.TaxPer / (100 + element.TaxPer))) / 2).toFixed(2);

                    element.TaxableAmount = element.Amount - element.Cgst - element.Sgst;

                    return element;
                });

                return LocalTaxData;
            },
            DefaultFunc: ({ inData }) => {
                if ("TaxPer" in inData[0]) {

                    let LocalTaxData = CommonGroupBy.SingleColumnAndMultipleDataRetruned({
                        inDataToSort: inData,
                        inGroupByColumn: "TaxPer",
                        inColumnsToGroupByAsFloat: ["Amount"]
                    });

                    LocalTaxData = LocalTaxData.map(element => {
                        if ("TaxPer" in element) {
                            if (typeof element.TaxPer === "string") {
                                element.TaxPer = parseFloat(element.TaxPer);
                            };
                        };

                        element.Cgst = ((element.Amount * (element.TaxPer / (100 + element.TaxPer))) / 2).toFixed(2);
                        element.Sgst = ((element.Amount * (element.TaxPer / (100 + element.TaxPer))) / 2).toFixed(2);

                        element.TaxableAmount = element.Amount - element.Cgst - element.Sgst;

                        return element;
                    });

                    //console.log("LocalTaxData : ", LocalTaxData);

                    return LocalTaxData;

                };

            }
        }
    }
};

module.exports = { StartFunc, FromDataFolder }