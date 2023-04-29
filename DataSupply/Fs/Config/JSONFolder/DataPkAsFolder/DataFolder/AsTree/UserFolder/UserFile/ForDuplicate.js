let Path = require("path");
let CommonFromFilesgetDirectories = require("../../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../ForDuplicate");


let AsObject = ({ inDataPK }) => {
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

    return LocalReturnObject;
};

let StartFunc = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};
    LocalReturnObject.Folders = {};

    let LocalArray = CommonFromgetDirectories.AsObject({ inDataPK: LocalDataPK });

    // result.forEach(element => {
    //     LocalReturnObject.Folders[element.FolderName] = element;
    // });

    Object.entries(LocalArray).forEach(
        ([KeyFolder, ValueFolder]) => {

            Object.entries(ValueFolder).forEach(
                ([KeyFile, ValueFile]) => {
                    ValueFile.Files = {};
                    let localFilesArray = CommonFromFilesgetDirectories.AsArray({ inFolderName: KeyFile, inDataPK: LocalDataPK });
                    localFilesArray.forEach(loopFileName => {
                        const filename = Path.parse(loopFileName).name
                        ValueFile.Files[filename] = {};
                        ValueFile.Files[filename].FileName = loopFileName;


                    });

                }
            );

        }
    );
    return LocalArray;

};
let LocalMockFunc = async () => {
    let LocalData = await StartFunc({ inDataPK: 1022, inFolderName: "Transactions" });
    console.log("LocalData : ", LocalData);
};

// LocalMockFunc();

module.exports = { StartFunc };
