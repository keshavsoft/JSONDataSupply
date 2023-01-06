<<<<<<< HEAD
// let CommonFromUserFolder = require("../../../../UserFolder/getDirectories");
// let CommonFromgetDirectories = require("../../../../getDirectories");

let CommonFromUserFolder = require("../../../../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../../../../../getDirectories");

let _ = require("lodash");

=======
let CommonFromUserFolder = require("../../../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../../../../getDirectories");
let _ = require("lodash");


>>>>>>> 2e1752cdd6656576d1ed5022b96cce018a076f6b
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
        let LoopInsideFile = JSON.parse(JSON.stringify(element));
        LoopInsideFile.Files = {};

        Object.entries(element.Files).forEach(
            ([FileKey, FileValue]) => {
                LoopInsideFile.Files[FileKey] = JSON.parse(JSON.stringify(FileValue));

                Object.entries(FileValue.Items).forEach(
                    ([ItemKey, ItemValue]) => {
                        LoopInsideFile.Files[FileKey].Items[ItemKey] = JSON.parse(JSON.stringify(ItemValue));

                        Object.entries(ItemValue.Screens).forEach(
                            ([ScreenKey, ScreenValue]) => {
                                delete ScreenValue.TableColumnsObject;

                                if ("TableInfo" in ScreenValue) {
<<<<<<< HEAD
                                   
                                    ScreenValue.KTF = ScreenValue.TableInfo.SearchRowArray.Label.KTF;
=======

                                    ScreenValue.ShowBalance = ScreenValue.TableInfo.FooterType.ShowBalance;
                                    ScreenValue.CreateNew = ScreenValue.TableInfo.FooterType.CreateNew;
                                    ScreenValue.ShowTotals = ScreenValue.TableInfo.FooterType.ShowTotals;
>>>>>>> 2e1752cdd6656576d1ed5022b96cce018a076f6b

                                }
                                LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey] = JSON.parse(JSON.stringify(ScreenValue));

                            }
                        );
                    }
                );
            }
        );

        return LoopInsideFile;
    });

    //  console.log("result---------- : ", LocalAltered[0].Files.Accounts.Items.Accounts.Screens.Create.TableColumnsObject.pk);

    LocalAltered.forEach(element => {
        LocalReturnObject.Folders[element.FolderName] = element;
    });

    return await LocalReturnObject;
};

let LocalMockFunc = async () => {
    let LocalData = await AsObject({ inDataPK: 901 });
    console.log("LocalData : ", LocalData);
};
<<<<<<< HEAD
LocalMockFunc().then();
=======

//LocalMockFunc().then();
>>>>>>> 2e1752cdd6656576d1ed5022b96cce018a076f6b

module.exports = { AsObject };
