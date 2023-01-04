const fs = require("fs");
let CommonFromCheck = require("./Check");
let CommonFromUserFileAsFolder = require("./UserFileAsFolder/DisplayJsonFile/PullData/AsTree");

// LocalLoopObject = {};
// LocalLoopObject.ItemName = key;
// LocalLoopObject.ItemNameForHtmlId = key.replace(" ", "_");
// //    LocalLoopObject.RowCount = Object.keys(value).length;
// LocalLoopObject.Screens = CommonScreens.RowsAsObjectsWithColumns({
//     inFolderName,
//     inFileNameWithExtension,
//     inItemName: key,
//     inUserPK
// });

// LocalReturnObject[key.replace(" ", "_")] = LocalLoopObject;

let AsArray = async ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = LocalFromCommonFromCheck.FolderPath;

    return fs.readdirSync(LocalDataPath).map((file) => {
        return file;
    });
};

let AsObjects = async ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;
    let LocalReturnObject = {};

    let LocalArray = await AsArray({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    const result = await Promise.all(LocalArray.map(async (file) => {
        let LoopInsideFile = await CommonFromUserFileAsFolder.AsObjects({
            inFolderName: LocalFolderName,
            inFileNameOnly: file,
            inDataPK: LocalDataPK
        });

        if (LoopInsideFile.KTF) {
            return await {
                FileName: file,
                Items: LoopInsideFile.JsonData
            };
            //return await LoopInsideFile.JsonData;
        } else {
            return await undefined;
        };
    }));

    let LocalRemoveUndefined = result.filter(element => element !== undefined);

    LocalRemoveUndefined.forEach(element => {
        //  console.log("element --------: ", element);

        LocalReturnObject[element.FileName] = element;
    });

    return await LocalReturnObject;
};


let LocalMockFunc = async () => {
    let LocalData = await AsObjects({
        inDataPK: 1022,
        inFolderName: "Transactions"
    });
    console.log("LocalData --------: ", LocalData);
};

// LocalMockFunc().then();

module.exports = { AsObjects };
