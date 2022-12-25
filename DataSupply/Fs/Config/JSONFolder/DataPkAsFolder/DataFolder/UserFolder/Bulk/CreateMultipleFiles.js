let CommonFromCreateFolder = require("../CreateFolder/FromInput");
let CommonFromAsBulk = require("../UserJsonFile/PushDataToFile/AsBulk.js");

let LocalReturnRowCount = ({ inPostData }) => {
    let LocalRowCount = 0;
    if (Object.values(inPostData).length > 0) {
        LocalRowCount = Object.keys(Object.values(inPostData)[0]).length;
    };

    return LocalRowCount;
};

let StartFunc = async ({ inFolderName, inData, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalFolderName = inFolderName;
    let LocalPostData = inData;

    let LocalReturnData = { KTF: false, DirPath: "", KResult: [] };

    let LocalFromCommonFromCheck = CommonFromCreateFolder.StartFunc({
        inDataPK: LocalinDataPK,
        inFolderName: LocalFolderName
    });
    //console.log("aaaaaaaaaaa : ", LocalFromCommonFromCheck);
    if (LocalFromCommonFromCheck.KTF || LocalFromCommonFromCheck.AlreadrPresent) {
        Object.entries(LocalPostData).forEach(
            async ([key, value]) => {
                let LocalFromCommonFromAsBulk = await CommonFromAsBulk.CreateFileWithData({
                    inFolderName: LocalFolderName,
                    inFileNameOnly: key,
                    inDataPK: LocalinDataPK,
                    inData: value
                });

                let LocalRowCount = LocalReturnRowCount({ inPostData: value });

                LocalReturnData.KTF = true;
                LocalReturnData.KResult.push({
                    KTF: true,
                    KMessage: `ItemName : ${key} : ${LocalRowCount} inserted to Folder : ${LocalFolderName}`
                });
                //console.log("LocalFromCommonFromAsBulk : ", LocalRowCount, LocalFromCommonFromAsBulk)

                // if (LocalFromCommonFromAsBulk.KTF == false) {
                //     LocalReturnData.KReason = LocalFromCommonFromAsBulk.KReason;

                //     return LocalReturnData;
                // };
            }
            //console.log(key)
        );
    };

    return await LocalReturnData;
};

let LocalMockFuncForStartFunc = async () => {
    let LocalFromStartFunc = await StartFunc({
        inFolderName: "Masters",
        inDataPK: 601,
        inFileName: "AccountGroup1Names",
        inData: {
            k1: "value1"
        }
    });
    console.log("LocalFromStartFunc : ", LocalFromStartFunc);
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inDataPK: 16
// }));

//LocalMockFuncForStartFunc().then();

module.exports = { StartFunc };
