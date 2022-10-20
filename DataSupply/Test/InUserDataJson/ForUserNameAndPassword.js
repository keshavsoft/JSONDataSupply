let Common1 = require("../../Fs/LoginFolder/UserDataJson/Find/UserNameAndPassword");

Common1.StartFunc({ inUserName: "TALLY", inPassWord: "TALLY" }).then(PromiseData => {
    console.log(PromiseData);
})
