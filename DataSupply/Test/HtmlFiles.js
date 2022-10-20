let Common = require("../Reports/CheckHtml/FilesAsArray");

// Common.StartFunc({ inFolderName: "Transactions", inFileNameOnly: "GST-SALES", inDataPK: 1022 }).then(PromiseData => {
//     console.log("PromiseData : ", PromiseData);
// });

let LocalFiles = Common.FromDataPK({
    inDataPK: 1022
});
console.log("LocalFiles------ : ", LocalFiles);
