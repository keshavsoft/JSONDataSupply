let CommonFromAsJson = require("./AsJson");

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
                LocalLoopObject.Screens = {};

                Object.entries(value).forEach(
                    ([ScreenKey, ScreenValue]) => {
                        let LocalScreenObject = {};
                        LocalScreenObject.ScreenName = ScreenKey;
                        LocalScreenObject.ScreenNameForHtmlId = ScreenKey.replace(" ", "_");
                        LocalScreenObject.ReturnDataJsonContent = ScreenValue;

                        LocalLoopObject.Screens[ScreenKey] = LocalScreenObject;
                    }
                );

                LocalReturnObject.JsonData[key.replace(" ", "_")] = LocalLoopObject;
            }
        );

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

const MockFuncForReturnData = () => {
    AsObjects({
        inFolderName: 'Masters', inFileNameOnly: "Products",
        inDataPK: 1022
    }).then(PromiseData => {
        console.log('PromiseData : ', PromiseData.JsonData.Products.Screens.Create);
    });
}

// MockFuncForReturnData();

module.exports = {
    AsObjects
};