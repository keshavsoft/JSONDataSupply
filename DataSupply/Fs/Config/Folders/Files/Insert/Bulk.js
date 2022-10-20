let CommonToDataFolder = require("./ToDataFolder");
let CommonToDisplayFolder = require("./ToDisplayFolder");
let CommonToReturnDataJson = require("./ToReturnDataJson");

let CommonForDisplay = require("./BulkInsert/PrepareData/ForDisplay");
let CommonForReturnData = require("./BulkInsert/PrepareData/ForReturnData");
let CommonFromFolderInsert = require("../../Insert/Start");

let Insert = async ({ inFolderName, inFileNameWithExtension, inData, inUserPK }) => {
    CommonFromFolderInsert.CreateIfNotPresent({ inToName: inFolderName, inUserPK });

    let LocalFromData = await CommonToDataFolder.CreateFileWithData({
        inFolderName,
        inFileNameWithExtension,
        inData,
        inUserPK
    });

    let LocalFromDisplay;
    let LocalFromDisplayInsert;
    let LocalForReturnData;
    let LocalFromReturnDataInsert;

    if (LocalFromData.KTF || LocalFromData.FilePresent) {
        LocalFromDisplay = await CommonForDisplay.StartFunc({
            inFolderName,
            inFileNameWithExtension,
            inDataToInsert: inData,
            inUserPK
        });

        if (LocalFromDisplay.KTF) {
            LocalForReturnData = await CommonForReturnData.StartFunc({
                inFileNameWithExtension,
                inDataToInsert: inData,
                inUserPK,
                inFolderName
            });

            if (LocalForReturnData.KTF) {
                LocalFromDisplayInsert = await CommonToDisplayFolder.CreateConfigFolderAndInsertContent({
                    inFolderName,
                    inFileNameWithExtension,
                    inContent: LocalFromDisplay.KResultObject,
                    inUserPK
                });

                if (LocalFromDisplayInsert.AlreadyPresent || LocalFromDisplayInsert.KTF) {
                    LocalFromReturnDataInsert = await CommonToReturnDataJson.StartFunc({
                        inFolderName,
                        inFileNameWithExtension,
                        inContent: LocalForReturnData.KResultObject,
                        inUserPK
                    });
                };
            };
        };
    };

    return await [LocalFromData, LocalFromDisplay, LocalFromDisplayInsert, LocalFromReturnDataInsert];
};

let InsertToDataOnly = async ({ inFolderName, inFileNameWithExtension, inData, inUserPK }) => {
    CommonFromFolderInsert.CreateIfNotPresent({ inToName: inFolderName, inUserPK });

    let LocalFromData = await CommonToDataFolder.CreateFileWithData({
        inFolderName,
        inFileNameWithExtension,
        inData,
        inUserPK
    });

    return await LocalFromData;
};

module.exports = { Insert, InsertToDataOnly };
