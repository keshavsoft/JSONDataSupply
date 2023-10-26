let CommonFromCheck = require("../../Check");
let CommonMock = require("../../../../../../../../../../MockAllow.json");

let CommomConfig = require("../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/PullData/NoSync");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalinScreenName = inScreenName;

    let localinFileNameWithExtension = `${inFileNameOnly}.json`;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });
    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    let LocalConfig = CommomConfig.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameWithExtension: localinFileNameWithExtension,
        inItemName: LocalinItemName,
        inScreenName: LocalinScreenName,
        inDataPK
    });

    LocalReturnData = { ...LocalConfig };
    LocalReturnData.KTF = false;

    if (LocalConfig.KTF === false) LocalReturnData;

    let LocalConfigColumns = LocalReturnData.JsonData.TableColumns;

    let LocalDataAsArray = Object.keys(LocalFromCommonFromCheck.JsonData[LocalinItemName]).map(element => {
        return {
            ...LocalFromCommonFromCheck.JsonData[LocalinItemName][element],
            pk: element
        };
    });


    let LocalJsonData = LocalFuncClubData({ ConfigColumns: LocalConfigColumns, inDataAsArray: LocalDataAsArray });
    LocalReturnData.JsonData = LocalJsonData;

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

const LocalFuncClubData = ({ ConfigColumns, inDataAsArray }) => {
    let LocalColumnsObject = Object.assign({}, ...ConfigColumns.map((x) => ({ [x.DataAttribute]: x.DisplayName })));

    let LocalNewArray = inDataAsArray.map(LoopElements => {
        let LoopInsideObj = {};

        Object.entries(LoopElements).map(LoopKeys => {
            if (LoopKeys[0] in LocalColumnsObject) {
                LoopInsideObj[LocalColumnsObject[LoopKeys[0]]] = LoopKeys[1];
            } else {
                LoopInsideObj[LoopKeys[0]] = LoopKeys[1];
            };
        });

        return LoopInsideObj;
    });

    return LocalNewArray;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K26') {
        let LocalMockData = require("./AsArray.json");

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:", LocalData);
    };
};

module.exports = { StartFunc };