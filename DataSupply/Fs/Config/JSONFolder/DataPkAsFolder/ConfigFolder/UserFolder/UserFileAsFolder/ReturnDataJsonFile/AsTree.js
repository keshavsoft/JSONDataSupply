// let CommonFromgetDirectories = require("../../../../getDirectories");
let CommonFromgetDirectories = require("../../../../../DataPkAsFolder/ConfigFolder/getDirectories");


let AsObjectFromCommonCode = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    // let LocalReturnObject = {};
    // LocalReturnObject.Folders = {};

    let LocalFromCommon = await CommonFromgetDirectories.AsObject({ inDataPK: LocalDataPK });
    console.log("LocalFromCommon:",Object.keys(LocalFromCommon));

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
                                    delete ValueForScreens.TableColumnsObject;
                                    delete ValueForScreens.TableInfo;
                                    // console.log("ValueForScreens:",ValueForScreens);


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
    let LocalData = await AsObjectFromCommonCode({ inDataPK: 1022 });
    console.log("LocalData---:",LocalData.Folders.Masters.Files.Accounts.Items.Accounts.Screens);
};

// LocalMockFunc().then();

module.exports = {  AsObjectFromCommonCode };
