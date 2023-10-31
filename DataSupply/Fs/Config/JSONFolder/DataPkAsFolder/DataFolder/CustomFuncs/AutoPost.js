// let CommonMaguva = require("./Clients/Maguva");
let CommonMaguva = require("./Clients/Maguva/EntryFile");
let CommonWashtex = require("./Clients/Washtex/EntryFile");
let CommonCleaning = require("./Clients/CleaningFromFile/EntryFile");

let StartFunc = async ({ inClientName, inPurchasePK, inFileNameOnly, inDataPk }) => {
    switch (inClientName) {
        case "Maguva":
            let LocalFromMaguva = await CommonMaguva.StartFunc({ inPurchasePK, inDataPk });
            console.log("ddddddddddd : ", LocalFromMaguva);
            return await LocalFromMaguva;
            break;
        case "Washtex":
            let LocalFromWashtex = await CommonWashtex.StartFunc({ inPurchasePK, inDataPk });
            console.log("ddddddddddd : ", LocalFromWashtex);
            return await LocalFromWashtex;
            break;
        case "Cleaning":
            let LocalFromCleaning = await CommonCleaning.StartFunc({ inPurchasePK, inFileNameOnly, inDataPk });
            console.log("ddddddddddd : ", LocalFromCleaning);
            return await LocalFromCleaning;
            break;
        default:
            break;
    };
};

module.exports = { StartFunc };
