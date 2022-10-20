let CommonFromData = require("../../../../../PullData/FromData");
let CommonToData = require("../../../../../PushData/ToData");
let CommonToDisplayForFileJson = require("../../../ToConfigFolder/ToDisplayForFileJson/PushData");

let CommonScreensInsert = require("../../../../Screens/Insert/ToDisplayForFileJson/FromTemplate");

let LocalArrayToObject = async ({ inItemData, inGuid }) => {
    let LocalReturnData = { KTF: false, KResult: [], KData: {} };
    let LocalReturnObject = {};

    inItemData.forEach(element => {
        if (inGuid in element) {
            LocalReturnObject[element[inGuid]] = element;
        };
    });

    LocalReturnData.KTF = true;
    LocalReturnData.KData = LocalReturnObject;

    return LocalReturnData;
};

let LocalToConigFunc = async ({ inFirstRow, inToName, inJsonConfig, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [], KData: {} };
    let LocalFromScreenInsert;
    try {
        LocalFromScreenInsert = await CommonScreensInsert.FromTemplate({
            inJsonConfig,
            inItemName: inToName,
            inUserPK,
            inFirstRow
        });

        if (LocalFromScreenInsert.KTF) {
            LocalReturnData.KTF = true;
            //   await LocalToConfigColumns({ inFirstRow, LocalItemConfig, inJsonConfig, inUserPK });
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

class ClassInsertNewColumns {
    static StartFunc = ({ inData }) => {
        let LocalReturnData = { KTF: false, KResult: [], KData: {} };

        Object.entries(inData).forEach(
            ([key, value]) => {
                if (!("InventoryGrid" in value)) {
                    value.InventoryGrid = {};
                };

                if (!("InventoryBatches" in value)) {
                    value.InventoryBatches = {};
                };

                if ("stockitemname" in value) {
                    this.LoopFuncs.InventoryGrid({ inLoopValue: value });
                };

                if ("stockitembatches" in value) {
                    this.LoopFuncs.InventoryBatches({ inLoopValue: value });
                };
            }
        );

        LocalReturnData.KTF = true;
        
        return LocalReturnData;
    }

    static LoopFuncs = {
        InventoryGrid: ({ inLoopValue }) => {
            let LocalArrayOfstockitemname = inLoopValue.stockitemname.split(";");
            let LocalArrayOfstockitemdescription = inLoopValue.stockitemdescription.split(";");
            let LocalArrayOfitemrate = inLoopValue.itemrate.split(";");
            let LocalArrayOfitemamount = inLoopValue.itemamount.split(";");
            let LocalArrayOfitemactualquantity = inLoopValue.itemactualquantity.split(";");
            let LocalArrayOfitembilledquantity = inLoopValue.itembilledquantity.split(";");
            let LocalArrayOfdiscount = inLoopValue.discount.split(";");

            for (let index = 0; index < LocalArrayOfstockitemname.length; index++) {
                inLoopValue.InventoryGrid[index + 1] = {
                    stockitemname: LocalArrayOfstockitemname[index],
                    stockitemdescription: LocalArrayOfstockitemdescription[index],
                    itemrate: LocalArrayOfitemrate[index],
                    itemamount: parseFloat(LocalArrayOfitemamount[index].replace(/,/g, "")),
                    itemactualquantity: LocalArrayOfitemactualquantity[index],
                    itembilledquantity: LocalArrayOfitembilledquantity[index],
                    discount: LocalArrayOfdiscount[index]
                }
            }
        },
        InventoryBatches: ({ inLoopValue }) => {
            let LocalArrayOfstockitemname = inLoopValue.stockitembatches.split(";");

            for (let index = 0; index < LocalArrayOfstockitemname.length - 1; index++) {
                inLoopValue.InventoryBatches[index + 1] = {
                    stockitembatches: LocalArrayOfstockitemname[index],
                }
            }
        }
    }
}

let BulkInsert = async ({ inJsonConfig, inToName, inItemData, inUserPK, inGuid }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalFromInsert;

    if (inItemData.length > 0) {
        let LocalFromTransform = await LocalArrayToObject({ inItemData, inGuid });

        if (LocalFromTransform.KTF) {
            ClassInsertNewColumns.StartFunc({ inData: LocalFromTransform.KData });
        };

        let LocalFromConfig = await LocalToConigFunc({
            inFirstRow: inItemData[0],
            inToName,
            inJsonConfig,
            inUserPK
        });

        if (LocalFromTransform.KTF) {
            let LocalOriginalData = await CommonFromData.AsJsonAsync({ inJsonConfig, inUserPK });
            let LocalNewData = JSON.parse(JSON.stringify(LocalOriginalData));

            if ((inToName in LocalNewData) === false) {
                if ("KData" in LocalFromTransform) {
                    LocalNewData[inToName] = LocalFromTransform.KData;

                    LocalFromInsert = await CommonToData.AsAsync({
                        inJsonConfig, inUserPK,
                        inOriginalData: LocalOriginalData,
                        inDataToUpdate: LocalNewData
                    });

                    if (LocalFromInsert.KTF) {
                        LocalReturnData.KTF = true;
                    };
                };
            };

        };
    };

    return LocalReturnData;
};

module.exports = { BulkInsert };
