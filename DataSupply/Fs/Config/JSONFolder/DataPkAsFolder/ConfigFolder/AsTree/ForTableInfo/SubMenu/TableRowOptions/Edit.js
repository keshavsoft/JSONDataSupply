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
                                    delete ValueForScreens.SubTableInfo;
                                    delete ValueForScreens.TableColumnsObject;
                                    delete ValueForScreens.ReturnDataJsonContent;
                                    let LoopInsideTableRowOptions = ValueForScreens.TableInfo.TableRowOptions.Edit.RowEdit;

                                    ValueForScreens.TableInfo = {};
                                    ValueForScreens.TableInfo.TableRowOptions = {};
                                    ValueForScreens.TableInfo.TableRowOptions.Edit = {};
                                    ValueForScreens.TableInfo.TableRowOptions.Edit.RowEdit = LoopInsideTableRowOptions;
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
