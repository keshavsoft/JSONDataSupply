let CommonFromCheck = require("../Check");
let CommonMock = require("../../../../../../../../../MockAllow.json");
let CommomConfig = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/PullData/NoSync");
const { forEach } = require("lodash");


let ReturnAsArrayWithPK = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK }) => {
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
    let LocalJsonData = LocalFromCommonFromCheck.JsonData[LocalinItemName];

    LocalJFFuncton({ ConfigColumns: LocalConfigColumns, JsonData: LocalJsonData });

    LocalReturnData.JsonData = Object.keys(LocalFromCommonFromCheck.JsonData[LocalinItemName]).map(element => {
        return {
            ...LocalFromCommonFromCheck.JsonData[LocalinItemName][element],
            pk: element
        };
    });

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

const LocalJFFuncton = ({ ConfigColumns, JsonData }) => {

    let LocalColumns = {
        ...ConfigColumns.map((element) => {
            let LoopInsideObj = {};
            LoopInsideObj[element.DataAttribute] = element.DisplayName;


            return LoopInsideObj
        })
    };
    let dictionary = Object.assign({}, ...ConfigColumns.map((x) => ({[x.DataAttribute]: x.DisplayName})));
    let dictionary2 = Object.assign({}, ...ConfigColumns.map((x) => ({[x.DataAttribute]: x.DisplayName})));
    
    console.log("dictionary::--", dictionary);

    let ss = Object.entries(JsonData);
    // console.log("LocalReturnData:-JsonData--:", ss);

};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KKS') {
        let LocalMockData = require('./FromFolderFileItemName.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:", LocalData);
    };
};

module.exports = { ReturnAsArrayWithPK };