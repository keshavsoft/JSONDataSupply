
let CommonFromgetDirectories = require("../../getDirectories");


let AsObject = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};
    LocalReturnObject.Folders = {};

    let LocalArray = CommonFromgetDirectories.StartFunc({ inDataPK: LocalDataPK });

    const result = LocalArray.map((file) => {


        return {
            FolderName: file
        };
    });

    result.forEach(element => {
        LocalReturnObject.Folders[element.FolderName] = element;
    });

    return await LocalReturnObject;
};
let LocalMockFunc = async () => {
    let LocalData = await AsObject({ inDataPK: 1022 });
    console.log("LocalData : ", LocalData);
};

// LocalMockFunc().then();

module.exports = { AsObject };
