let CommonFromPullDataFromFile = require("../../PullDataFromFile/FromFolderAndFile");
let CommonFromPushDataToFile = require("../../PushDataToFile/FolderAndFile");
let CommonMock = require("../../../../../../../../../MockAllow.json");
let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inJsonPk }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromPullDataFromFile.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    if ((LocalinItemName in LocalFromCommonFromCheck.JsonData) === false) {
        LocalReturnData.KReason = `Item Name : ${LocalinItemName} not found!`;
        delete LocalReturnData.JsonData;
        return LocalReturnData;
    };

    if ((inJsonPk in LocalFromCommonFromCheck.JsonData[LocalinItemName]) === false) {
        LocalReturnData.KReason = `RowPK : ${inJsonPk} is not found in data!`;
        delete LocalReturnData.JsonData;
        return LocalReturnData;
    };

    if (LocalFuncUserAccessCheck({
        inDataPKPath: LocalReturnData.DataPKPath,
        inFolderName, inFileNameOnly, inItemName,
        inDataPK: LocalinDataPK
    }) === false) {
        delete LocalReturnData.JsonData;
        LocalReturnData.KReason = `User Access Violation`;
        return LocalReturnData;
    };

    let LocalDeletedData = LocalFromCommonFromCheck.JsonData[LocalinItemName][inJsonPk];

    delete LocalFromCommonFromCheck.JsonData[LocalinItemName][inJsonPk];

    let LocalFromPush = await CommonFromPushDataToFile.InsertToJson({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
    });

    if (LocalFromPush.KTF) {
        LocalFuncPostDeleteActions({
            inDataPKPath: LocalReturnData.DataPKPath,
            inDeletedData: LocalDeletedData,
            inJsonPk,
            inFolderName, inFileNameOnly, inItemName,
            inDataPK: LocalinDataPK
        });
    };

    LocalReturnData.KTF = true;
    delete LocalReturnData.JsonData;

    return await LocalReturnData;
};

let LocalFuncPostDeleteActions = ({ inDataPKPath, inDeletedData, inJsonPk, inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalOldData = fs.readFileSync(`${inDataPKPath}/Log.json`);
    let LocalOldDataAsJson = JSON.parse(LocalOldData);

    LocalOldDataAsJson[LocalinFolderName][LocalinFileNameOnly][LocalinItemName].DeleteData.push({
        OriginalData: { [inJsonPk]: inDeletedData },
        DeletedDT: new Date()
    });

    fs.writeFileSync(`${inDataPKPath}/Log.json`, JSON.stringify(LocalOldDataAsJson));
};


let LocalFuncPostDeleteActions1 = ({ inDataPKPath, inDeletedData, inJsonPk, inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalUserAccessData = fs.readFileSync(`${inDataPKPath}/UserAccess.json`);
    let LocalUserAccessDataAsJson = JSON.parse(LocalUserAccessData);

    let LocalFind = LocalUserAccessDataAsJson.find(element => element.UserPk === inDataPK);

    if (LocalFind.AccessInfo[LocalinFolderName][LocalinFileNameOnly][LocalinItemName].DeleteRight) {
        let LocalOldData = fs.readFileSync(`${inDataPKPath}/Log.json`);
        let LocalOldDataAsJson = JSON.parse(LocalOldData);

        LocalOldDataAsJson[LocalinFolderName][LocalinFileNameOnly][LocalinItemName].DeleteData.push({
            OriginalData: { [inJsonPk]: inDeletedData },
            DeletedDT: new Date()
        });

        fs.writeFileSync(`${inDataPKPath}/Log.json`, JSON.stringify(LocalOldDataAsJson));
    };
};

let LocalFuncUserAccessCheck = ({ inDataPKPath, inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalUserAccessData = fs.readFileSync(`${inDataPKPath}/UserAccess.json`);
    let LocalUserAccessDataAsJson = JSON.parse(LocalUserAccessData);

    let LocalFind = LocalUserAccessDataAsJson.find(element => element.UserPk === inDataPK);

    return LocalFind.AccessInfo[LocalinFolderName][LocalinFileNameOnly][LocalinItemName].DeleteRight;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K28') {
        let LocalMockData = require('./FromPK.json');

        StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = { StartFunc };
