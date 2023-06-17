let CommonFromUserFolder = require("../../../../UserFolder/getDirectories");
// let CommonFromgetDirectories = require("../../../../getDirectories");
let CommonFromgetDirectories = require("../../../../getDirectoriesWithCheckAndDelete");
let CommonMockAllow = require("../../../../../../../../../MockAllow.json");

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
                                delete ScreenValue.TableColumnsObject;

                                if ("TableInfo" in ScreenValue) {
                                    ScreenValue.Simple = ScreenValue.TableInfo.TableRowOptions.Delete.Simple;

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
                                    delete ValueForScreens.ReturnDataJsonContent;
                                    let LoopInsideTableRowOptions = ValueForScreens.TableInfo.TableRowOptions.Delete;

                                    ValueForScreens.TableInfo = {};
                                    ValueForScreens.TableInfo.TableRowOptions = {};
                                    ValueForScreens.TableInfo.TableRowOptions.Delete = LoopInsideTableRowOptions;
                                    // delete ValueForScreens.TableInfo;
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


if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "TABLE") {
        AsObject({
            inDataPK: CommonMockAllow.DataPK
        }).then(FromPromise => {
            console.log("FromPromise : ", FromPromise.Folders.Trans.Files.PAYMENTS.Items["BANK-CASH-DEPOSITS"].Screens.Show.TableInfo.TableRowOptions);
        });
    };
};

module.exports = { AsObject };
