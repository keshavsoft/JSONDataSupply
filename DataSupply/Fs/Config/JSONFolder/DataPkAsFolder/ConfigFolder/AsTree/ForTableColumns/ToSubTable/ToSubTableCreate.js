let CommonFromgetDirectoriesWithCheckAndDelete = require("../../../UserFolder/getDirectoriesWithCheckAndDelete");

let CommonFromUserFolder = require("../../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../../../getDirectories");
let _ = require("lodash");
let CommonMockAllow = require("../../../../../../../../MockAllow.json");

let AsObject = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};
    LocalReturnObject.Folders = {};

    let LocalFromDirectories = await CommonFromgetDirectories.AsObject({ inDataPK: LocalDataPK });

    Object.entries(LocalFromDirectories.Folders).forEach(
        ([KeyForFolder, ValueForFolder]) => {
            Object.entries(ValueForFolder.Files).forEach(
                ([KeyForFiles, ValueForFiles]) => {
                    Object.entries(ValueForFiles.Items).forEach(
                        ([KeyForItems, ValueForItems]) => {
                            Object.entries(ValueForItems.Screens).forEach(
                                ([KeyForScreens, ValueForScreens]) => {
                                    delete ValueForScreens.TableInfo;
                                    delete ValueForScreens.SubTableInfo;

                                    if ("SubTableColumnsObject" in ValueForScreens) {
                                        // delete the subtable columns from tablecolumns
                                        let LoopInsideSubTableColumns = Object.keys(ValueForScreens.SubTableColumnsObject);

                                        LoopInsideSubTableColumns.forEach(element => {
                                            delete ValueForScreens.TableColumnsObject[element];
                                        });
                                    };
                                }
                            );



                        }
                    );
                }
            );
        }
    );

    return await LocalFromDirectories;
};


let AsObject_29May2023 = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};
    LocalReturnObject.Folders = {};

    let LocalArray = CommonFromgetDirectories.StartFunc({ inDataPK: LocalDataPK });

    const result = await Promise.all(LocalArray.map(async (file) => {
        let LoopInsideFile = await CommonFromgetDirectoriesWithCheckAndDelete.AsObjects({
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

                                delete LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].SubTableColumnsObject
                                delete LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].SubTableInfo
                                delete LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].TableInfo

                                Object.entries(ScreenValue.TableColumnsObject).forEach(
                                    ([ColumnKey, ColumnValue]) => {
                                        LoopInsideFile.Files[FileKey].Items[ItemKey].Screens[ScreenKey].TableColumnsObject[ColumnKey] = {
                                            DataAttribute: ColumnValue.DataAttribute,
                                            DisplayName: ColumnValue.DisplayName
                                        };
                                    }
                                );

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

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Keshav") {
        AsObject({ inDataPK: CommonMockAllow.DataPK }).then(PromiseData => {
            // console.log("PromiseData : ", PromiseData);

            console.log("PromiseData : ", Object.keys(PromiseData.Folders.Transactions.Files.Sales.Items.Bills.Screens.Create));

            console.log("PromiseData : ", Object.keys(PromiseData.Folders.Transactions.Files.Sales.Items.Bills.Screens.Create.TableColumnsObject));

            console.log("SubTableColumnsObject : ", Object.keys(PromiseData.Folders.Transactions.Files.Sales.Items.Bills.Screens.Create.SubTableColumnsObject));

        });
    };
};
// LocalMockFunc().then();

module.exports = { AsObject };
