let CommonFromUserFolder = require("../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../../getDirectories");
let _ = require("lodash");

let AsObject = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};
    LocalReturnObject.Folders = {};

    let LocalArray = CommonFromgetDirectories.StartFunc({ inDataPK: LocalDataPK });

    const result = await Promise.all(LocalArray.map(async (file) => {
        let LoopInsideFile = await CommonFromUserFolder.AsObjects({
            inFolderName: file,
            inDataPK: LocalDataPK
        });

        return await {
            FolderName: file,
            Files: LoopInsideFile
        };
    }));

    let LocalAltered = result.map(element => {
        element.Files = _.forOwn(element.Files, (FileKey, FileValue) => {

        });

        //console.log("result : ", k1);

        //console.log("result : ", k1, _.pick(element, "Files.Accounts.Items.Accounts.Screens.Create.TableColumnsObject.AccountName"));

        return element;
    });

    console.log("result : ", LocalAltered[0].Files.Accounts.Items.Accounts.Screens.Create.TableColumnsObject.AccountName);

    result.forEach(element => {
        LocalReturnObject.Folders[element.FolderName] = element;
    });


    // console.log("result : ", result);
    return await LocalReturnObject;
};

let LocalMockFunc = async () => {
    let LocalData = await AsObject({ inDataPK: 1022 });
    console.log("LocalData : ", LocalData);
};

// LocalMockFunc().then();

module.exports = { AsObject };
