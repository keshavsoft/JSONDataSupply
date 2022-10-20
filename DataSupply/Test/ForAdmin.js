let Common = require("../Fs/LoginFolder/AdminDataJson/Check/ForFile");
let Common1 = require("../Fs/LoginFolder/AdminDataJson/PullData/FromFile");
let Common2 = require("../Fs/LoginFolder/Check/ForFolder");

// Common.StartFunc().then(PromiseData => {
//     console.log("PromiseData : ", PromiseData);
// });

// Common2.StartFunc().then((PromiseData) => {
//     console.log(PromiseData);
// });
// let result=Common.StartFunc();
// Common.StartFunc().then((PromiseData) => {
//     console.log(PromiseData);
// });
let result=Common1.StartFunc();
console.log(result);