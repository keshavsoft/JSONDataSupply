let fs = require("fs");
let localPullCheckData = require("../Check");

const StartFunc = ({ inFolderName }) => {
    let localReturnData = { KTF: false }

    let locaFromCheck = localPullCheckData.StartFunc({ inFolderName });

    localReturnData = { ...locaFromCheck };

    if (locaFromCheck.KTF === false) {
        return localReturnData;
    };

    try {
        fs.rmSync(locaFromCheck.FolderPath, { recursive: true, force: true });

        localReturnData.KTF = true;
    }
    catch (err) {
        console.log("err:---", err);
    };


    return localReturnData;

};

const MockLockFunc = () => {
    let LocalFromMock = StartFunc({ inFolderName: 1022 });
    console.log("LocalFromMock : ", LocalFromMock);
};

// MockLockFunc();

module.exports = { StartFunc };