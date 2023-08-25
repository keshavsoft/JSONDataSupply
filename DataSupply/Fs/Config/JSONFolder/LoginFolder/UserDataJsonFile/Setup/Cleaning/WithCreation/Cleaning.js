let CommonMock = require("../../../../../../../../MockAllow.json");
let CommonInsert = require("../../../Insert/UserNamePassword");
let CommonWithOutCreation = require("../WithOutCreation/Cleaning");

let StartFunc = ({ inUserName, inPassword }) => {
    let LocalPullData = CommonInsert.StartFunc({ inUserName, inPassword });

    let LocalReturnObject = { ...LocalPullData };
    LocalReturnObject.KTF = false;

    if (LocalPullData.KTF === false) {
        return LocalReturnObject;
    };

    let LocalNewPk = LocalReturnObject.NewDataPk;

    let LocalFromCreation = CommonWithOutCreation.StartFunc({ inDataPK: LocalNewPk });

    LocalReturnObject = { ...LocalFromCreation };
    LocalReturnObject.KTF = false;

    if (LocalFromCreation.KTF === false) {
        return LocalReturnObject;
    };

    LocalReturnObject.KTF = true;
    LocalReturnObject.NewDataPk = LocalNewPk;

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K2') {
        let LocalMockData = require('./Cleaning.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);
    };
};

module.exports = { StartFunc };