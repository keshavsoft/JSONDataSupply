let CommonFromFile = require("../PullData/FromFile");

let StartFunc = async ({ inUserName }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {}, kPK: 0 };
    let LocalFromCheck = await CommonFromFile.StartFunc();
    if (LocalFromCheck.KTF) {
        if ("data" in LocalFromCheck.JsonData) {
            Object.entries(LocalFromCheck.JsonData.data).forEach(
                ([key, value]) => {
                    if (value.UserName === inUserName) {
                        LocalReturnData.kPK = parseInt(key);
                        LocalReturnData.KTF = true;
                    };
                }
            );
        };
    } else {
        LocalReturnData.KReason = "Json file not found";
    };

    return await LocalReturnData;
};

let LocalMockFuncForLogin = () => {
    StartFunc({ inUserName: "K111" }).then(p => {
        console.log("sssss : ", p);
    });
};

//LocalMockFunc();

module.exports = { StartFunc };