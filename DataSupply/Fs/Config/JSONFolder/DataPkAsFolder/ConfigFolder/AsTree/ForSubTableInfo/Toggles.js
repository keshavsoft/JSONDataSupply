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
                                LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].SubTableInfo = {};

                                if ("SubTableInfo" in ScreenValue && ScreenValue.SubTableInfo !== undefined) {

                                    Object.entries(ScreenValue.SubTableInfo).forEach(
                                        ([SubInfoKey, SubInfoValue]) => {
                                            LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].SubTableInfo[SubInfoKey] = {
                                                ShowFooter: SubInfoValue.ShowFooter,
                                                HeadRowSearch: SubInfoValue.HeadRowSearch,
                                                DataAttributesFromTableInfo: SubInfoValue.DataAttributesFromTableInfo,
                                                DataAttributesFromTableDataRow: SubInfoValue.DataAttributesFromTableDataRow

                                            }
                                        }

                                    );
                                }

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
    let LocalData = await AsObject({ inDataPK: 1024 });
};

// LocalMockFunc().then();

module.exports = { AsObject };
