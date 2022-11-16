let CommonPullData = require("../../../../../DataSupply/Fs/LoginFolder/UserDataJson/PullData/FromFile");
let CommonPushData = require("../../../../../DataSupply/Fs/LoginFolder/UserDataJson/PushData/ToJsonFile");
let CommonEmail = require("../../../../../common/Jwt/Email");
let CommonUtilityFuncs = require("../../../../UtilityFuncs/BackupToMail");
let CommonUpdate = require("../Update");
let CommonFind = require("../Find/UserName");

let StartFunc = async ({ inUserName, inPassword }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromfileData = await CommonPullData.StartFunc();

    if (LocalFromfileData.KTF) {
        if ("JsonData" in LocalFromfileData) {
            let LocalToBeInsertedData = JSON.parse(JSON.stringify(LocalFromfileData.JsonData));

            if ("data" in LocalToBeInsertedData) {
                var StringArray = Object.keys(LocalToBeInsertedData.data);
                var NumericArray = StringArray.map(Number);
                //const maxNum = Math.max(...NumericArray).toString();
                const maxNum = Math.max(...NumericArray)

                if ((maxNum + 1 in LocalToBeInsertedData.data) === false) {
                    LocalToBeInsertedData.data[maxNum + 1] = {
                        UserName: inUserName,
                        PassWord: inPassword
                    };
                };

                if (Object.keys(LocalToBeInsertedData.data).length > Object.keys(LocalFromfileData.JsonData.data).length) {
                    let LocalFromUpdate = await CommonPushData.StartFunc({
                        inOriginalData: LocalFromfileData.JsonData,
                        inDataToUpdate: LocalToBeInsertedData
                    });

                    if (LocalFromUpdate.KTF) {
                        LocalReturnData.KTF = true;
                        LocalReturnData.kPK = maxNum + 1;
                    };
                }
            };
        }
    };

    return await LocalReturnData;

};

let WithEmail = async ({ inUserName, inPassword, inEmail }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    try {
        let LocalFromfileData = await CommonPullData.StartFunc();

        if (LocalFromfileData.KTF) {
            if ("JsonData" in LocalFromfileData) {
                let LocalToBeInsertedData = JSON.parse(JSON.stringify(LocalFromfileData.JsonData));

                if ("data" in LocalToBeInsertedData) {
                    var StringArray = Object.keys(LocalToBeInsertedData.data);
                    var NumericArray = StringArray.map(Number);
                    //const maxNum = Math.max(...NumericArray).toString();
                    let maxNum = Math.max(...NumericArray)
                    console.log("NumericArray : ", NumericArray);
                    if (NumericArray.length === 0) {
                        maxNum = 2000;
                    };

                    if ((maxNum + 1 in LocalToBeInsertedData.data) === false) {
                        LocalToBeInsertedData.data[maxNum + 1] = {
                            UserName: inUserName,
                            PassWord: inPassword,
                            Email: inEmail
                        };
                    };

                    if (Object.keys(LocalToBeInsertedData.data).length > Object.keys(LocalFromfileData.JsonData.data).length) {
                        let LocalFromUpdate = await CommonPushData.StartFunc({
                            inOriginalData: LocalFromfileData.JsonData,
                            inDataToUpdate: LocalToBeInsertedData
                        });

                        if (LocalFromUpdate.KTF) {
                            LocalReturnData.KTF = true;
                            LocalReturnData.kPK = maxNum + 1;
                        };
                    }
                };
            }
        };

        if (LocalReturnData.KTF) {
            LocalFromEmail = await CommonEmail.CreateToken({ inUserName, inEmail })

            if (LocalFromEmail !== "") {
                let LocalFromUtilityFuncs = await CommonUtilityFuncs.SendEmail({
                    inUserName,
                    inJWToken: LocalFromEmail,
                    inToEmail: inEmail
                });
                console.log("LocalFromUtilityFuncs : ", LocalFromUtilityFuncs);
                if (LocalFromUtilityFuncs.KTF) {
                    //fs.writeFileSync(LocalFilePath, JSON.stringify(LocalUserDataJson));
                    CommonUpdate.EmailSent({ inUserPk: LocalReturnData.kPK });
                };
            };
        };

    } catch (error) {
        LocalReturnData.KReason = error;
        console.log("WithEmail error : ", error);
    };

    return await LocalReturnData;
};

let WithUerNameAndEmailOnly = async ({ inUserName, inEmail }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    console.log("WithUerNameAndEmailOnly--------------", inUserName, inEmail);
    try {
        let LocalFromCommonFind = await CommonFind.StartFunc({ inUserName });

        if (LocalFromCommonFind.KTF) {
            LocalReturnData.KReason = `UserName : ${inUserName} already present!`;
            return await LocalReturnData;
        };

        let LocalFromfileData = await CommonPullData.StartFunc();

        if (LocalFromfileData.KTF) {
            if ("JsonData" in LocalFromfileData) {
                let LocalToBeInsertedData = JSON.parse(JSON.stringify(LocalFromfileData.JsonData));

                if ("data" in LocalToBeInsertedData) {
                    var StringArray = Object.keys(LocalToBeInsertedData.data);
                    var NumericArray = StringArray.map(Number);
                    let maxNum = Math.max(...NumericArray)

                    if (NumericArray.length === 0) {
                        maxNum = 2000;
                    };

                    if ((maxNum + 1 in LocalToBeInsertedData.data) === false) {
                        LocalToBeInsertedData.data[maxNum + 1] = {
                            UserName: inUserName,
                            PassWord: inUserName,
                            Email: inEmail
                        };
                    };

                    if (Object.keys(LocalToBeInsertedData.data).length > Object.keys(LocalFromfileData.JsonData.data).length) {
                        let LocalFromUpdate = await CommonPushData.StartFunc({
                            inOriginalData: LocalFromfileData.JsonData,
                            inDataToUpdate: LocalToBeInsertedData
                        });

                        if (LocalFromUpdate.KTF) {
                            LocalReturnData.KTF = true;
                            LocalReturnData.kPK = maxNum + 1;
                        };
                    }
                };
            }
        };

        if (LocalReturnData.KTF) {
            LocalFromEmail = await CommonEmail.CreateToken({ inUserName, inEmail })

            if (LocalFromEmail !== "") {
                let LocalFromUtilityFuncs = await CommonUtilityFuncs.SendEmail({
                    inUserName,
                    inJWToken: LocalFromEmail,
                    inToEmail: inEmail
                });

                if (LocalFromUtilityFuncs.KTF) {
                    //fs.writeFileSync(LocalFilePath, JSON.stringify(LocalUserDataJson));
                    CommonUpdate.EmailSent({ inUserPk: LocalReturnData.kPK });
                };
            };
        };

    } catch (error) {
        if ("KSClientError" in error) {
            LocalReturnData.KSClientError = error.KSClientError;
            LocalReturnData.KError = error.KError;
            return await LocalReturnData;
        } else {
            LocalReturnData.KReason = error;
            console.log("WithEmail error : ", error);
        };
    };

    return await LocalReturnData;
};

module.exports = { StartFunc, WithEmail, WithUerNameAndEmailOnly };