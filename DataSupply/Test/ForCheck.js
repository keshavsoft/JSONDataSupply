let Common = require("../Fs/Config/Folders/Files/Check/InDisplayJsonFolder/ForFolder/ForFileAsFolder");
let Common1 = require("../Fs/Config/Folders/Files/Check/InDisplayJsonFolder/ForJsonFiles/ForReturnDataJson");
let Common2 = require("../Fs/Config/Folders/Files/PullData/FromConfigFolder/FromReturnDataJson");
let Common3 = require("../Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromReturnDataJson");

// Common.StartFunc({ inFolderName: "Transactions", inFileNameOnly: "GST-SALES", inDataPK: 1022 }).then(PromiseData => {
//     console.log("PromiseData : ", PromiseData);
// });

Common3.UsingJsonConfigAsync({
    inJsonConfig: { inFolderName: "Transactions", inJsonFileName: "GST-SALES.json" },
    inItemConfig: {
        inItemName: "GST-SALE",
        inScreenName: "Create"
    },
    inDataPK: 1022
}).then(PromiseData => {
    console.log("PromiseData : ", PromiseData);
});
