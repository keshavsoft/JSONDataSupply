
let CommonFromUserFolder = require("../../../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../../../../getDirectories");
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
        let LoopInsideFile = JSON.parse(JSON.stringify(element));
        LoopInsideFile.Files = {};

        Object.entries(element.Files).forEach(
            ([FileKey, FileValue]) => {
                LoopInsideFile.Files[FileKey] = JSON.parse(JSON.stringify(FileValue));

                Object.entries(FileValue.Items).forEach(
                    ([ItemKey, ItemValue]) => {
                        LoopInsideFile.Files[FileKey].Items[ItemKey] = JSON.parse(JSON.stringify(ItemValue));
                       // LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey] = JSON.parse(JSON.stringify(ScreenValue));

                        Object.entries(ItemValue.Screens).forEach(
                            ([ScreenKey, ScreenValue]) => {
                               // LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey] = JSON.parse(JSON.stringify(ScreenValue));

                                if ("TableInfo" in ScreenValue) {
                                    LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].TableInfoObject = {
                                        ShowBalance: ScreenValue.TableInfo.FooterType.ShowBalance,
                                        CreateNew: ScreenValue.TableInfo.FooterType.CreateNew,
                                        ShowTotals: ScreenValue.TableInfo.FooterType.ShowTotals
                                    };
                                };


                                delete LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].SubTableColumns;
                                delete LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].TableColumnsObject;
                                delete LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].TableInfo;


                                // delete ScreenValue.TableColumnsObject;

                                // if ("TableInfo" in ScreenValue) {
                                //     // ScreenValue.KTF = ScreenValue.TableInfo.SearchRowArray.Label.KTF;

                                //     ScreenValue.ShowBalance = ScreenValue.TableInfo.FooterType.ShowBalance;
                                //     ScreenValue.CreateNew = ScreenValue.TableInfo.FooterType.CreateNew;
                                //     ScreenValue.ShowTotals = ScreenValue.TableInfo.FooterType.ShowTotals;
                                // };

                                // LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey] = JSON.parse(JSON.stringify(ScreenValue));
                            }
                        );
                    }
                );
            }
        );

        return LoopInsideFile;
    });

    LocalAltered.forEach(element => {
        LocalReturnObject.Folders[element.FolderName] = element;
    });

    return await LocalReturnObject;
};

let LocalMockFunc = async () => {
    let LocalData = await AsObject({ inDataPK: 901 });
    console.log("LocalData : ", LocalData);
};

//LocalMockFunc().then();

module.exports = { AsObject };
