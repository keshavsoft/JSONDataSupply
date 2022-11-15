
let StartFunc = ({ inData }) => {
    let LocalReturnData = { KTF: false, KResult: [], KData: {} };

    Object.entries(inData).forEach(
        ([key, value]) => {
            if (!("InventoryGrid" in value)) {
                value.InventoryGrid = {};
            };

            if (!("InventoryBatches" in value)) {
                value.InventoryBatches = {};
            };

            if (!("LedgerEntries" in value)) {
                value.LedgerEntries = {};
            };

            if ("ksstockitemname" in value) {
                //  value.InventoryGrid.stockitemname = "";
                //console.log("gggggggggggggggggg");
                LocalLoopFuncs.InventoryGrid({ inLoopValue: value });
            };

            if ("ksstockitembatches" in value) {
                LocalLoopFuncs.InventoryBatches({ inLoopValue: value });
            };

            if ("ksledger_name" in value) {
                //  value.InventoryGrid.stockitemname = "";
                LocalLoopFuncs.LedgerEntries({ inLoopValue: value });
            };
        }
    );

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

let LocalLoopFuncs = {
    InventoryGrid: ({ inLoopValue }) => {
        let LocalArrayOfstockitemname = inLoopValue.ksstockitemname.split(";");
        let LocalArrayOfstockitemdescription = inLoopValue.ksstockitemdescription.split(";");
        let LocalArrayOfitemrate = inLoopValue.ksitemrate.split(";");
        let LocalArrayOfitemamount = inLoopValue.ksitemamount.split(";");
        let LocalArrayOfitemactualquantity = inLoopValue.ksitemactualquantity.split(";");
        let LocalArrayOfitembilledquantity = inLoopValue.ksitembilledquantity.split(";");
        let LocalArrayOfdiscount = inLoopValue.ksdiscount.split(";");

        for (let index = 0; index < LocalArrayOfstockitemname.length; index++) {
            inLoopValue.InventoryGrid[index + 1] = {
                ksstockitemname: LocalArrayOfstockitemname[index],
                ksstockitemdescription: LocalArrayOfstockitemdescription[index],
                ksitemrate: LocalArrayOfitemrate[index],
                ksitemamount: parseFloat(LocalArrayOfitemamount[index].replace(/,/g, "")),
                ksitemactualquantity: LocalArrayOfitemactualquantity[index],
                ksitembilledquantity: LocalArrayOfitembilledquantity[index],
                ksdiscount: LocalArrayOfdiscount[index]
            }
        }
    },
    InventoryBatches: ({ inLoopValue }) => {

        let LocalksstockitemexpiryKey = "ksstockitemexpiry";
        let LocalArrayOfstockitemname = inLoopValue[LocalksstockitemexpiryKey].split(";");
        let LocalArrayOfstockitemexpiry = [];

        if (LocalksstockitemexpiryKey in inLoopValue) {
            LocalArrayOfstockitemexpiry = inLoopValue[LocalksstockitemexpiryKey].split(";");
        };

        for (let index = 0; index < LocalArrayOfstockitemname.length - 1; index++) {
            inLoopValue.InventoryBatches[index + 1] = {
                stockitembatches: LocalArrayOfstockitemname[index]
            };

            if (index <= LocalArrayOfstockitemexpiry.length) {
                inLoopValue.InventoryBatches[index + 1][LocalksstockitemexpiryKey] = LocalArrayOfstockitemexpiry[index];
            };
        };
    },
    InventoryBatches1: ({ inLoopValue }) => {
        let LocalArrayOfstockitemname = inLoopValue.stockitembatches.split(";");

        for (let index = 0; index < LocalArrayOfstockitemname.length - 1; index++) {
            inLoopValue.InventoryBatches[index + 1] = {
                stockitembatches: LocalArrayOfstockitemname[index],
            }
        }
    },
    LedgerEntries: ({ inLoopValue }) => {
        let Localledger_nameKey = "ksledger_name";
        let Localledger_positive = "ksledger_positive";
        let Localledger_amount = "ksledger_amount";

        let LocalArrayOfledger_name = inLoopValue[Localledger_nameKey].split(";");
        let LocalArrayOfledger_positive;
        let LocalArrayOfledger_amount;

        if (Localledger_positive in inLoopValue) {
            LocalArrayOfledger_positive = inLoopValue[Localledger_positive].split(";");
        };

        if (Localledger_amount in inLoopValue) {
            LocalArrayOfledger_amount = inLoopValue[Localledger_amount].split(";");
        };
        
        for (let index = 0; index < LocalArrayOfledger_name.length; index++) {
            inLoopValue.LedgerEntries[index + 1] = {
                ledgername: LocalArrayOfledger_name[index]
            };

            if (index <= LocalArrayOfledger_positive.length) {
                inLoopValue.LedgerEntries[index + 1].ledgerpositive = LocalArrayOfledger_positive[index];
            };

            if (index <= LocalArrayOfledger_amount.length) {
                inLoopValue.LedgerEntries[index + 1].ledgeramount = parseFloat(LocalArrayOfledger_amount[index].replace(/,/g, ""));
            };
        }
    }
};

module.exports = {
    StartFunc
};
