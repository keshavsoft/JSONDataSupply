let CommonFilesPullData = require("../../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../../../Fs/Config/Folders/Files/PushData/ToData");

let WithOutScreen = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalUserData;
    let LocalUserDataWithItemName;
    let LocalUpdatedData;

    if (inUserPK > 0) {
        LocalUserData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });

        LocalUpdatedData = JSON.parse(JSON.stringify(LocalUserData));
        LocalUpdatedData[inItemConfig.inItemName]=inPostData;

        //LocalUserDataWithItemName = inPostData;

        // LocalUpdateRow({
        //     inOriginalData: LocalUserDataWithItemName[inRowPK],
        //     inPostData
        // });
        console.log("LocalUpdatedData : ", inItemConfig);
        let PromiseData = await CommonFilesPushData.AsAsync({
            inJsonConfig,
            inUserPK, inOriginalData: LocalUserData,
            inDataToUpdate: LocalUpdatedData
        });
        console.log("PromiseData : ", PromiseData);
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
