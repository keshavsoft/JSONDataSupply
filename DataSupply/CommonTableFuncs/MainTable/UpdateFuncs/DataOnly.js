let CommonFilesPullData = require("../../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../../../Fs/Config/Folders/Files/PushData/ToData");

let WithOutScreen = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inRowPK }) => {
    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalUserData;
    let LocalUserDataWithItemName;
    let LocalUpdatedData;

    if (inUserPK > 0) {
        LocalUserData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });

        LocalUpdatedData = JSON.parse(JSON.stringify(LocalUserData));
        LocalUserDataWithItemName = LocalUpdatedData[inItemConfig.inItemName];

        LocalUserDataWithItemName[inRowPK] = inPostData;

        // LocalUpdateRow({
        //     inOriginalData: LocalUserDataWithItemName[inRowPK],
        //     inPostData
        // });

        let PromiseData = await CommonFilesPushData.AsAsync({
            inJsonConfig,
            inUserPK, inOriginalData: LocalUserData,
            inDataToUpdate: LocalUpdatedData
        });

        if (PromiseData.KTF === true) {
            LocalReturnObject.KTF = true;
        };
    };

    return await LocalReturnObject;
};

// let LocalMockFuncForOnlyKeys = async () => {
//     await WithOutScreen({
//         inJsonConfig: {
//             inFolderName: "Loans",
//             inJsonFileName: "6.json"
//         }, inItemConfig: {
//             inItemName: "PageInfo"

//         }, inUserPK: 2051,
//         inPostData: "aaaaaaaaaaa",
//         inRowPK: "BranchId"
//     });
// };

// LocalMockFuncForOnlyKeys().then();

module.exports = { WithOutScreen };
