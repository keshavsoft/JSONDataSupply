// let CommonMaguva = require("./Clients/Maguva");
let CommonMaguva = require("./Clients/Maguva/EntryFile");
let CommonWashtex = require("./Clients/Washtex/EntryFile");

let StartFunc = async ({ inClientName, inPurchasePK, inDataPk }) => {
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

        default:
            break;
    };
};

module.exports = { StartFunc };
