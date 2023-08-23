let CommonPullData = require("../PullDataFromFile/FromJson");
let CommonMock = require("../../../../../../MockAllow.json");

let StartFunc = ({ inUserName, inPassword }) => {
    let LocalPullData = CommonPullData.StartFunc();

    console.log("LocalPullData : ", LocalPullData);
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K2') {
        let LocalMockData = require('./UserNamePassword.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };