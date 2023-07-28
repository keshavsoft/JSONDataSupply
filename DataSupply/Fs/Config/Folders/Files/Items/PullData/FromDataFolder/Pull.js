let CommonPullData = require("../../../PullData/FromData");

let FromItemNameAsArray = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPk }) => {
    if (inDataPk > 0) {
        let LocalReturnData;

        let LocalDataFromJSON = await CommonPullData.AsJsonAsyncFromFolderAndFile({
            inFolderName, inFileNameWithExtension, inUserPK: inDataPk
        });

        if (inItemName in LocalDataFromJSON) {
            LocalReturnData = LocalDataFromJSON[inItemName];
        };

        return await Object.values(LocalReturnData);
    };
};

let AsJsonAsync = async ({ inJsonConfig, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalReturnData;

        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({
            inJsonConfig, inUserPK: LocalDataPK
        });

        if (inItemName in LocalDataFromJSON) {
            LocalReturnData = LocalDataFromJSON[inItemName];
        };

        return await Object.values(LocalReturnData);
    };
};

let AsArrayWithPK = async ({ inJsonConfig, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = { KTF: false, DirPath: "", FilePath: "", ArrayData: [] };

    if (LocalDataPK > 0) {
        let LocalReturnData;

        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({
            inJsonConfig, inUserPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalDataFromJSON };
        LocalReturnObject.KTF = false;

        if (inItemName in LocalDataFromJSON === false) {
            LocalReturnObject.KReason = "Item not found...";
            return await LocalReturnObject;
        };

        if (inItemName in LocalDataFromJSON) {
            LocalReturnData = LocalDataFromJSON[inItemName];
        };

        Object.entries(LocalReturnData).forEach(
            ([key, value]) => {
                value.pk = key;
                LocalReturnObject.ArrayData.push(value);

                // LocalReturnObject.ArrayData.push({ pk: key, ...value });
            }
        );
        LocalReturnObject.KTF = true;
        //return await Object.values(LocalReturnData);
    } else {
        LocalReturnObject.KReason = "DataPK should be positive";
    };

    return await LocalReturnObject;
};

let AsJsonAsyncAsObject = async ({ inJsonConfig, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalReturnData;

        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({
            inJsonConfig, inUserPK: LocalDataPK
        });

        if (inItemName in LocalDataFromJSON) {
            LocalReturnData = LocalDataFromJSON[inItemName];
        };

        return await LocalReturnData;
    };
};

module.exports = {
    FromItemNameAsArray,
    AsJsonAsync,
    AsJsonAsyncAsObject,
    AsArrayWithPK
};