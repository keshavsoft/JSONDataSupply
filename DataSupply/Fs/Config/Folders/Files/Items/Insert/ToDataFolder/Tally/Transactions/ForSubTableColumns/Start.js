
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
                LocalLoopFuncs.InventoryGrid({ inLoopValue: value });
            };

            if ("ksstockitembatches" in value) {
                LocalLoopFuncs.InventoryBatches({ inLoopValue: value });
            };

            if ("ksledger_name" in value) {
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

        delete inLoopValue.ksstockitemname;
        delete inLoopValue.ksstockitemdescription;
        delete inLoopValue.ksitemrate;
        delete inLoopValue.ksitemamount;
        delete inLoopValue.ksitemactualquantity;
        delete inLoopValue.ksitembilledquantity;
        delete inLoopValue.ksdiscount;

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
        let LocalksstockitembatchesKey = "ksstockitembatches";

        let LocalArrayOfstockitemname = inLoopValue[LocalksstockitembatchesKey].split(";");
        let LocalArrayOfstockitemexpiry = [];

        if (LocalksstockitemexpiryKey in inLoopValue) {
            LocalArrayOfstockitemexpiry = inLoopValue[LocalksstockitemexpiryKey].split(";");
        };

        delete inLoopValue[LocalksstockitembatchesKey];
        delete inLoopValue[LocalksstockitemexpiryKey];

        for (let index = 0; index < LocalArrayOfstockitemname.length - 1; index++) {
            inLoopValue.InventoryBatches[index + 1] = {
                stockitembatches: LocalArrayOfstockitemname[index].trim()
            };

            if (index <= LocalArrayOfstockitemexpiry.length) {
                inLoopValue.InventoryBatches[index + 1][LocalksstockitemexpiryKey] = LocalArrayOfstockitemexpiry[index].trim();
            };
        };
    },
    LedgerEntries: ({ inLoopValue }) => {
        let Localledger_nameKey = "ksledger_name";
        let Localledger_positive = "ksledger_positive";
        let Localledger_amount = "ksledger_amount";
        let ksledgerdescription_key = "ksledger_description";

        let LocalArrayOfledger_name = inLoopValue[Localledger_nameKey].split(";");
        let LocalArrayOfledger_positive;
        let LocalArrayOfledger_amount;
        let LocalArrayOfledger_description;

        if (Localledger_positive in inLoopValue) {
            LocalArrayOfledger_positive = inLoopValue[Localledger_positive].split(";");
        };

        if (Localledger_amount in inLoopValue) {
            LocalArrayOfledger_amount = inLoopValue[Localledger_amount].split(";");
        };

        if (ksledgerdescription_key in inLoopValue) {
            LocalArrayOfledger_description = inLoopValue[ksledgerdescription_key].split(";");
        };

        delete inLoopValue[Localledger_nameKey];
        delete inLoopValue[Localledger_positive];
        delete inLoopValue[Localledger_amount];
        delete inLoopValue[ksledgerdescription_key];

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

            if (index <= LocalArrayOfledger_description.length || LocalArrayOfledger_name.length === LocalArrayOfledger_description.length) {
                inLoopValue.LedgerEntries[index + 1].ledgerdescription = LocalArrayOfledger_description[index].trim();
            };
        }
    }
};

module.exports = {
    StartFunc
};
