const fs = require("fs");
const path = require('path')
let CommonFromCheck = require("./Check");
let CommonMockAllow = require("../../../../../MockAllow.json");

let StartFunc = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({ inDataPK: LocalDataPK });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = `${LocalFromCommonFromCheck.DirPath}`;
    let LocalReturnObject = {};

    fs.readdirSync(LocalDataPath).forEach((RootFolder) => {
        if (fs.statSync(LocalDataPath + '/' + RootFolder).isDirectory()) {
            LocalReturnObject[RootFolder] = {};

            fs.readdirSync(LocalDataPath + '/' + RootFolder).forEach((FileInFolder) => {
                let FileInFolderWithOutExtension = path.parse(FileInFolder).name;

                if (fs.statSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}`).isDirectory()) {
                    LocalReturnObject[RootFolder][FileInFolderWithOutExtension] = {};

                    if (fs.existsSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}/Display.json`)) {
                        let rawdata = fs.readFileSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}/Display.json`);
                        let student = JSON.parse(rawdata);

                        LocalReturnObject[RootFolder][FileInFolderWithOutExtension] = student;
                    };
                };

                // if (fs.statSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}`).isFile()) {
                //     let rawdata = fs.readFileSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}`);
                //     let student = JSON.parse(rawdata);

                //     LocalReturnObject[RootFolder][FileInFolderWithOutExtension] = student;
                // };
            });
        };
    });

    return LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K12") {
        let PromiseData = StartFunc({ inDataPK: CommonMockAllow.DataPK });
        //   console.log("PromiseData : ", Object.keys(PromiseData.Masters), Object.keys(PromiseData), Object.keys(PromiseData.Trans));

        console.log("PromiseData : ", PromiseData.Masters.Items.ItemName);

    };
};

module.exports = { StartFunc };
