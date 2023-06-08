// let CommonFromAsJson = require("./AsJson");
let CommonFromAsJson = require("./PullDataFromFile/FromFolderAndFile");
let CommonMockAllow = require("../../../../../../../MockAllow.json");

let AsObjects = async ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalFolderName = inFolderName;
        let LocalFileNameOnly = inFileNameOnly;

        LocalDataFromCommonCreate = await CommonFromAsJson.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: LocalFileNameOnly,
            inDataPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        Object.entries(LocalDataFromCommonCreate.JsonData).forEach(
            ([key, value]) => {
                LocalLoopObject = {};
                LocalLoopObject.ItemName = key;
                LocalLoopObject.ItemNameForHtmlId = key.replace(" ", "_");

                LocalReturnObject.JsonData[key.replace(" ", "_")] = LocalLoopObject;
            }
        );

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K162") {
        AsObjects({
            inFolderName: "Masters",
            inFileNameOnly: "Items",
            inDataPK: CommonMockAllow.DataPK
        }).then(PromiseData => {
            console.log("PromiseData ; ", PromiseData);
        });
    };
};

module.exports = {
    AsObjects
};