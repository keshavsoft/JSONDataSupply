let CommonFromFile = require("../PullData/FromFile");

let StartFunc = async ({ inUserName, inPassWord }) => {
  let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {}, kPK: 0 };
  let LocalFromCheck = await CommonFromFile.StartFunc();
  //console.log("This one", LocalFromCheck);
  if (LocalFromCheck.KTF) {
    if ("data" in LocalFromCheck.JsonData) {
      Object.entries(LocalFromCheck.JsonData.data).forEach(([key, value]) => {
        if (value.UserName === inUserName && value.PassWord === inPassWord) {
          LocalReturnData.kPK = key;
        }
      });

      LocalReturnData.KTF = true;
    }
  } else {
    LocalReturnData.KReason = "Json file not found";
  }

  return await LocalReturnData;
};

module.exports = { StartFunc };
