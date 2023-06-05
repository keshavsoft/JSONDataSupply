let CommonConfigFolder = require("../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/ColumnName/PushData/FromInput");
// let CommonConfigFolderReturnDataJsonFile = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/ReturnDataJsonFile/ItemName/ScreenName/PushData/FromInput");

let CommonMockAllow = require("../../../../../../../../../../MockAllow.json");
let path = require("path");

let StartFunc = ({ inFolderName, inFileName, inItemName, inScreenName, inDataPK, NewColumnName }) => {
    let LocalFileName = inFileName;
    let LocalFileNameOnly = path.parse(LocalFileName).name;

    let localFromConfig = CommonConfigFolder.StartFuncNoSync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName,
        inScreenName,
        NewColumnName,
        inDataPK
    });

    // let localFromConfigReturnData = CommonConfigFolderReturnDataJsonFile.StartFuncNoSync({
    //     inFolderName,
    //     inFileNameOnly: LocalFileNameOnly,
    //     inItemName,
    //     inScreenName,
    //     inDataPK
    // });

    return [localFromConfig];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "s1") {
        let LocalFrom = StartFunc({
            inFolderName: "SimpleQuestions",
            inFileName: "OnUI.json",
            inItemName: "AllowNumberOnly",
            inScreenName: "Create",
            NewColumnName:"ss",
            inDataPK: 19
        });

        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };