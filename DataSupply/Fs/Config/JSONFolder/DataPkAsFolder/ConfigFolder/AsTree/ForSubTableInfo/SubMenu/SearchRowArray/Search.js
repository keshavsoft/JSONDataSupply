let CommonFromUserFolder = require("../../../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../../../../getDirectories");
let _ = require("lodash");
let CommonMockAllow = require("../../../../../../../../../MockAllow.json");


let StartFunc = async ({ inDataPK }) => {
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
                                    ValueForScreens.TableInfoObject = ValueForScreens.TableInfo.SearchRowArray.Label;

                                    delete ValueForScreens.SubTableColumnsObject;
                                    // delete ValueForScreens.SubTableInfo;
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
    let LocalData = await StartFunc({ inDataPK: 20 });
    console.log("LocalData ", LocalData.Folders.Masters.Files.Items.Items.ItemName.Screens);
};


if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "KesahavMock1") {

        console.log("aaaaaa");
    };


};
// LocalMockFunc().then();

module.exports = {  StartFunc };
