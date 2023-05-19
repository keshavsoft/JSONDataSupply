let CommonFromUserFolder = require("../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../../getDirectories");

let AsObject1 = async ({ inDataPK }) => {
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
                                LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey] = JSON.parse(JSON.stringify(ScreenValue));

                                if ("SubTableColumnsObject" in ScreenValue && ScreenValue.SubTableColumnsObject !== undefined) {
                                    Object.entries(ScreenValue.SubTableColumnsObject).forEach(
                                        ([SubColumnKey, SubColumnValue]) => {
                                            LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].SubTableColumnsObject[SubColumnKey] = JSON.parse(JSON.stringify(SubColumnValue));

                                            if ("TableColumnsObject" in SubColumnValue && SubColumnValue.TableColumnsObject !== undefined) {
                                                Object.entries(SubColumnValue.TableColumnsObject).forEach(
                                                    ([SubColumnTableColumnKey, SubColumnTableColumnValue]) => {
                                                        LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].SubTableColumnsObject[SubColumnKey].TableColumnsObject[SubColumnTableColumnKey] = {

                                                            DataAttribute: SubColumnTableColumnValue.DataAttribute,
                                                            DisplayName: SubColumnTableColumnValue.DisplayName,
                                                            ShowInTable: SubColumnTableColumnValue.ShowInTable,
                                                            Insert: SubColumnTableColumnValue.Insert,
                                                            CreateNew: SubColumnTableColumnValue.CreateNew,
                                                            IsTextArea: SubColumnTableColumnValue.IsTextArea
                                                        };
                                                    }
                                                );

                                            };

                                        }
                                    );

                                };
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

let AsObject = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalFromCommon = await CommonFromgetDirectories.AsObject({ inDataPK: LocalDataPK });

    Object.entries(LocalFromCommon.Folders).forEach(
        ([KeyForFolder, ValueForFolder]) => {
            Object.entries(ValueForFolder.Files).forEach(
                ([KeyForFiles, ValueForFiles]) => {
                    Object.entries(ValueForFiles.Items).forEach(
                        ([KeyForItems, ValueForItems]) => {
                            Object.entries(ValueForItems.Screens).forEach(
                                ([KeyForScreens, ValueForScreens]) => {
                                    // delete ValueForScreens.SubTableColumnsObject;
                                    delete ValueForScreens.SubTableInfo;
                                    delete ValueForScreens.TableColumnsObject;
                                    delete ValueForScreens.TableInfo;
                                    delete ValueForScreens.ReturnDataJsonContent;

                                }
                            );
                        }
                    );
                }
            );
        }
    );

    return await LocalFromCommon;
};

let LocalMockFunc = async () => {
    let LocalData = await AsObject({ inDataPK: 1022 });
    //  console.log("LocalData : ", LocalData);
};

// LocalMockFunc().then();

module.exports = { AsObject };
