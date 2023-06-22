let CommonFromUserFolder = require("../../../../UserFolder/getDirectories");
// let CommonFromgetDirectories = require("../../../../getDirectories");
let CommonFromgetDirectories = require("../../../../getDirectoriesWithCheckAndDelete");
let CommonMockAllow = require("../../../../../../../../../MockAllow.json");


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
                                    let LoopInsideTableRowOptions = ValueForScreens.TableInfo.TableRowOptions.Show;

                                    ValueForScreens.TableInfo = {};
                                    ValueForScreens.TableInfo.TableRowOptions = {};
                                    ValueForScreens.TableInfo.TableRowOptions.Show = LoopInsideTableRowOptions;
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
    if (CommonMockAllow.MockKey === "SSV") {
        AsObject({
            inDataPK: CommonMockAllow.DataPK
        }).then(FromPromise => {
            
            console.log("FromPromise : ", FromPromise.Folders.Transactions.Files.JOURNALS.Items.JOURNAL.Screens.Alter.TableInfo);
        });
    };
};

module.exports = { AsObject };
