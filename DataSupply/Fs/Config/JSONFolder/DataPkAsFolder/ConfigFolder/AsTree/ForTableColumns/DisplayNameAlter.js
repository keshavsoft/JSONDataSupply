let CommonFromgetDirectories = require("../../getDirectories");

let MockFunc = require("../../../../../../../MockAllow.json");

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
                                    delete ValueForScreens.SubTableColumnsObject;
                                    delete ValueForScreens.SubTableInfo;
                                    // delete ValueForScreens.TableColumnsObject;
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

if (MockFunc.AllowMock) {
    if (MockFunc.MockKey === "WWW") {
        AsObject({ inDataPK: MockFunc.DataPK }).then(PromiseData => { 
            console.log("PromiseData:",PromiseData.Folders.Transactions.Files.RECEIPTS.Items.RECEIPT.Screens.Show);
        });

    };
};
module.exports = { AsObject };
