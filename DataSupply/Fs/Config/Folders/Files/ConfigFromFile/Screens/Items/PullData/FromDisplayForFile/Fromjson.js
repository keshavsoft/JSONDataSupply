// let CommonCheck = require("../Check/ConfigFromFile");
// let path = require("path");
// let fs = require("fs");
let CommonFromJsonConfig = require("../../../../../PullData/From-ConfigFromFile");

let AsJsonAsync = async ({ inJsonConfig, inScreenName, inDataPK }) => {
    //console.log("inUserPK : ", inUserPK);

    let LocalReturnData;

    if (inDataPK > 0) {
        let LocalScreenName = inScreenName;

        let LocalFromJsonConfig = await CommonFromJsonConfig.AsJsonAsync({ inJsonConfig, inUserPK: inDataPK });

        if (LocalScreenName in LocalFromJsonConfig) {
        //    console.log("LocalScreenName------ : ", LocalScreenName);
            LocalReturnData = LocalFromJsonConfig[LocalScreenName];
        };
    };
//    console.log("LocalReturnData------ : ", LocalReturnData);

    return await LocalReturnData;
};

module.exports = {
    AsJsonAsync
};