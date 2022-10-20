//let CommonPullData = require("../../../../PullData/FromData");
let CommonPullData = require("../../../../Items/PullData/FromDataFolder/PullFuncs/AsObjectWithPK");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK, inColumns }) => {
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalReturnData;

        // let LocalDataFromJSON = await CommonPullData.AsJsonAsyncFromFolderAndFile({
        //     inFolderName, inFileNameWithExtension,
        //     inUserPK: LocalDataPK
        // });

        let LocalDataFromJSON = await CommonPullData.FromFolderAndFileAsObject({
            inFolderName, inFileNameWithExtension,
            inItemName,
            inDataPK: LocalDataPK
        });
        
        if (LocalDataFromJSON.KTF) {
            let LocalUserDataWithItemName = Object.values(LocalDataFromJSON.JsonData).sort((a, b) => (a[inColumns[0]] > b[inColumns[0]]) ? 1 : ((b[inColumns[0]] > a[inColumns[0]]) ? -1 : 0));

            LocalReturnData = LocalUserDataWithItemName.map(element => {
                LocalLoopObject = {};
                LocalLoopArray = [];

                for (var i in inColumns) {
                    LocalLoopArray.push(element[inColumns[i]]);
                    LocalLoopObject[inColumns[i]] = element[inColumns[i]];
                };

                return LocalLoopArray;
            });
        };
        return await LocalReturnData;
    };
};

module.exports = {
    StartFunc
};