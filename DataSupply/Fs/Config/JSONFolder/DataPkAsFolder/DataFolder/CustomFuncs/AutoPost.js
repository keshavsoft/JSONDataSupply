let CommonMaguva = require("./Clients/Maguva");

let StartFunc = async ({ inClientName, inPurchasePK }) => {
    switch (inClientName) {
        case "Maguva":
            let LocalFromMaguva = await CommonMaguva.StartFunc({ inPurchasePK });
            
            return await LocalFromMaguva;
            break;

        default:
            break;
    };
};

module.exports = { StartFunc };
