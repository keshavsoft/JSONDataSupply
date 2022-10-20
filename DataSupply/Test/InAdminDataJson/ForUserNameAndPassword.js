let Common1 = require("../../Fs/LoginFolder/AdminDataJson/Find/UserNameAndPassword");

Common1.StartFunc({ inUserName: "KESHAV", inPassWord: "KESHAV" }).then(
  (PromiseData) => {
    console.log(PromiseData);
  }
);
