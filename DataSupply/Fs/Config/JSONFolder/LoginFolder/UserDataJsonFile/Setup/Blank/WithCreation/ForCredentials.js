let CommonMock = require("../../../../../../../../MockAllow.json");
let CommonInsert = require("../../../Insert/UserNamePassword");
let CommonWithOutCreation = require("../WithOutCreation/Blank");
let CommonFind = require("../../../Find/UserCredentialsWithFolderCheck")

let StartFunc = ({ inUserName, inPassword }) => {
    let LocalPullData = CommonInsert.StartFunc({ inUserName, inPassword });

    let LocalReturnObject = { ...LocalPullData };
    LocalReturnObject.KTF = false;

    if (LocalPullData.KTF === false) {
        let LocalFromFind = CommonFind.StartFunc({ inUserName, inPassWord: inPassword });
        LocalReturnObject = { ...LocalFromFind };
        LocalReturnObject.KTF = false;

        if (LocalFromFind.KTF && LocalFromFind.DataPkFolderFound) {
            delete LocalReturnObject.JsonData;
            LocalReturnObject.UserAndDataPkFolderFound = true;
            LocalReturnObject.kPK = LocalFromFind.kPK;
        };

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
    LocalReturnObject.RedirectPage = LocalFromCreation.JsonData.Firm.Config.Ui.Login.RedirectPage;
    delete LocalReturnObject.JsonData

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSVC') {
        let LocalMockData = require('./ForCredentials.json');

        let LocalData = StartFunc({
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);
    };
};

module.exports = { StartFunc };