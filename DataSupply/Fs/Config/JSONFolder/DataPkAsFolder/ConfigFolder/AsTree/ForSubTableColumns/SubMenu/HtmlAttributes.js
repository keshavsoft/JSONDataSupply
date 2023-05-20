let CommonFromgetDirectories = require("../../../getDirectories");


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
