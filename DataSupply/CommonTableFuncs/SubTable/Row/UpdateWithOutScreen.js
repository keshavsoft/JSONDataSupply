let CommonDisplayPullData = require("../../../Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromJson");
let CommonFilesPullData = require("../../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../../../Fs/Config/Folders/Files/PushData/ToData");

let CommonMock = require("../../../MockAllow.json");

let LocalUpdateRow = ({ inOriginalData, inPostData }) => {
    Object.entries(inPostData).forEach(
        ([key, value]) => {
            inOriginalData[key] = value;
        }
    );
};

let WithTransformBeforeSave = async ({ JsonConfig, ItemConfig, UserPK, inDataToUpdate, MainRowPK, InsertKey, SubTableRowPK }) => {
    let inJsonConfig = JsonConfig;
    let inItemConfig = ItemConfig;
    let inUserPK = UserPK;
    let inPostData = inDataToUpdate;
    let inRowPK = MainRowPK;
    let inSubTableKey = InsertKey;
    let inSubTableRowPK = SubTableRowPK;

    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalUserData;
    let LocalUserDataWithItemName;
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

    if ((inSubTableRowPK in LocalUserDataWithItemName[inRowPK][inSubTableKey]) === false) {
        LocalReturnObject.KReason = `inSubTableRowPK : ${inSubTableRowPK} in not found in PK : ${inSubTableKey}`;
        return await LocalReturnObject;
    };

    LocalUpdateRow({
        inOriginalData: LocalUserDataWithItemName[inRowPK][inSubTableKey][inSubTableRowPK],
        inPostData: inPostData
    });

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
    if (CommonMock.MockKey === 'KES') {
        let LocalMockData = require('./UpdateWithOutScreen.json');

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
