
let CommonFromgetDirectories = require("../../getDirectories");


let AsObject =  ({ inDataPK }) => {
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

    return  LocalReturnObject;
};
let LocalMockFunc =  () => {
    let LocalData =  AsObject({ inDataPK: 1022 });
    console.log("LocalData : ", LocalData);
};

// LocalMockFunc().then();

module.exports = { AsObject };
