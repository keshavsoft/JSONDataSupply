let CommonFilesPullData = require("../../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../../../Fs/Config/Folders/Files/PushData/ToData");

let CommonMock = require("../../../MockAllow.json");

let WithTransformBeforeSave = async ({ JsonConfig, ItemConfig, UserPK, inDataToUpdate, MainRowPK, InsertKey }) => {
    let inJsonConfig = JsonConfig;
    let inItemConfig = ItemConfig;
    let inUserPK = UserPK;
    let inPostData = inDataToUpdate;
    let inRowPK = MainRowPK;
    let inSubTableKey = InsertKey;

    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalUserData;
    let LocalUserDataWithItemName;
    let LocalConfigData;
    let LocalUpdatedData;

    if ((inUserPK > 0) === false) {
        LocalReturnObject.KReason = `${inUserPK} not found in Data as folder!`;
        return await LocalReturnObject;
    };

    LocalUserData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });

    LocalUpdatedData = JSON.parse(JSON.stringify(LocalUserData));
    LocalUserDataWithItemName = LocalUpdatedData[inItemConfig.inItemName];

    if ((inRowPK in LocalUserDataWithItemName) === false) {
        LocalReturnObject.KReason = `SubTableColumns not found in Config`;
        return await LocalReturnObject;
    };

    if ((inSubTableKey in LocalUserDataWithItemName[inRowPK]) === false) {
        LocalReturnObject.KReason = `inSubTableKey : ${inSubTableKey} in not found in PK : ${inRowPK}`;
        return await LocalReturnObject;
    };

    if ((typeof LocalUserDataWithItemName[inRowPK][inSubTableKey] === "object") === false) {
        LocalReturnObject.KReason = `inSubTableKey : ${inSubTableKey} value should be object only`;
        return await LocalReturnObject;
    };

    LocalUserDataWithItemName[inRowPK][inSubTableKey] = inPostData;

    let PromiseData = await CommonFilesPushData.AsAsync({
        inJsonConfig,
        inUserPK, inOriginalData: LocalUserData,
        inDataToUpdate: LocalUpdatedData
    });

    if (PromiseData.KTF === true) {
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K14') {
        let LocalMockData = require('./UpdateAsObject.json');

        WithTransformBeforeSave({
            UserPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = {
    WithTransformBeforeSave
};
