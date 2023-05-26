let CommonFromgetDirectories = require("../../../getDirectoriesWithCheckAndDelete");
let CommonMockAllow = require("../../../../../../../../MockAllow.json");

let AsObject = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalFromCommon = await CommonFromgetDirectories.AsObject({ inDataPK: LocalDataPK });

    LocalDeleteScreens({ inData: LocalFromCommon });

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

const LocalDeleteScreens = ({ inData }) => {
    Object.entries(inData.Folders).forEach(
        ([KeyForFolder, ValueForFolder]) => {
            Object.entries(ValueForFolder.Files).forEach(
                ([KeyForFiles, ValueForFiles]) => {
                    Object.entries(ValueForFiles.Items).forEach(
                        ([KeyForItems, ValueForItems]) => {
                            Object.entries(ValueForItems.Screens).forEach(
                                ([KeyForScreens, ValueForScreens]) => {

                                    if ("SubTableColumnsObject" in ValueForScreens === false) {
                                        delete ValueForItems.Screens[KeyForScreens];
                                    } else {
                                        if (Object.keys(ValueForScreens.SubTableColumnsObject).length === 0) {
                                            delete ValueForItems.Screens[KeyForScreens];
                                        };
                                    }

                                }
                            );

                            if (Object.keys(ValueForItems.Screens).length === 0) {
                                delete ValueForFiles.Items[KeyForItems];
                            };
                        }
                    );

                    if (Object.keys(ValueForFiles.Items).length === 0) {
                        delete ValueForFolder.Files[KeyForFiles];
                    };
                }
            );

            if (Object.keys(ValueForFolder.Files).length === 0) {
                delete inData.Folders[KeyForFolder];
            };
        }
    );
};

if (CommonMockAllow.AllowMock) {
    AsObject({
        inDataPK: CommonMockAllow.DataPK
    }).then(FromPromise => {
        console.log("FromPromise : ", FromPromise);
    });
};

module.exports = { AsObject };
