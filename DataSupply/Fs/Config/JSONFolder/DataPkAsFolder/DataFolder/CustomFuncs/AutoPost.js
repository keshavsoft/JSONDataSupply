// let CommonMaguva = require("./Clients/Maguva");
let CommonMaguva = require("./Clients/Maguva/EntryFile");
let CommonWashtex = require("./Clients/Washtex/EntryFile");
let CommonCleaning = require("./Clients/CleaningFromFile/EntryFile");

let StartFunc = async ({ inClientName, inPurchasePK, inFileNameOnly, inDataPk }) => {
    switch (inClientName) {
        case "Maguva":
            let LocalFromMaguva = await CommonMaguva.StartFunc({ inPurchasePK, inDataPk });
            
            return await LocalFromMaguva;
            break;
        case "Washtex":
            let LocalFromWashtex = await CommonWashtex.StartFunc({ inPurchasePK, inDataPk });
            
            return await LocalFromWashtex;
            break;
        case "Cleaning":
            let LocalFromCleaning = await CommonCleaning.StartFunc({ inPurchasePK, inFileNameOnly, inDataPk });
            
            return await LocalFromCleaning;
            break;
        default:
            break;
    };
};

module.exports = { StartFunc };
