let CommonFolderIncludeAllFiles = require("../../../../Fs/Config/Folders/PullData/FromDataFolder/IncludeAllFiles");
let CommonPullItemData = require("../../../../Fs/Config/Folders/Files/Items/PullData/FromDataFolder/PullFuncs/AsArray");

const StartFunc = async ({ inVouchersConsiderLine, inUserPK }) => {
    let LocalReturnData;
    let LocalReturnObject = { KTF: false, KReason: "", KResult: [] };
    let LocalFromLoopFunc;
    let LocalFolderName = inVouchersConsiderLine.FolderName;

    let LocalJsonConfig = {
        inFolderName: LocalFolderName,
        inJsonFileName: inVouchersConsiderLine.FileName
    };

    if ("FromFolder" in inVouchersConsiderLine) {
        if (inVouchersConsiderLine.FromFolder) {
            LocalFromLoopFunc = await CommonFolderIncludeAllFiles.AsArray({
                inFolderName: LocalFolderName,
                inDataPK: inUserPK
            });

            if (LocalFromLoopFunc.KTF) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.KResult = LocalFromLoopFunc.ReturnArray;
            } else {
                LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
            };

            return;
        };
    };

    if ("FromFolder" in inVouchersConsiderLine) {
        if (inVouchersConsiderLine.FromFolder) {
            if ("FolderConfig" in inVouchersConsiderLine) {
                if ("ConsiderFilesArray" in inVouchersConsiderLine.FolderConfig) {
                    LocalFromLoopFunc = await CommonFolderIncludeAllFiles.AsArray({
                        inFolderName: LocalFolderName,
                        inDataPK: inUserPK,
                        inConsiderFilesArray: inVouchersConsiderLine.FolderConfig.ConsiderFilesArray
                    });

                    if (LocalFromLoopFunc.KTF) {
                        LocalReturnObject.KTF = true;
                        LocalReturnObject.KResult = LocalFromLoopFunc.ReturnArray;
                    } else {
                        LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                    };
                } else {
                    LocalReturnObject.KReason = `ConsiderFilesArray not found in VouchersConsiderArray.FolderConfig`;
                };
            } else {
                LocalReturnObject.KReason = `FolderConfig not found in VouchersConsiderArray`;
            };

        } else {
            if ("ItemNameConsider" in inVouchersConsiderLine) {
                if (inVouchersConsiderLine.ItemNameConsider) {
                    LocalFromLoopFunc = await CommonPullItemData.FromJsonConfig({
                        inJsonConfig: LocalJsonConfig,
                        inItemName: inVouchersConsiderLine.ItemName,
                        inDataPK: inUserPK
                    });

                    if (LocalFromLoopFunc.KTF) {
                        LocalReturnObject.KTF = true;
                        LocalReturnObject.KResult = LocalFromLoopFunc.ReturnArray;
                    } else {
                        LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                    };
                } else {
                    LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncFromJsonFileComplete({
                        inReturnData: LocalReturnData
                    });
                    if (LocalFromLoopFunc.KTF) {
                        LocalReturnObject.KTF = true;
                        LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                    } else {
                        LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                    };
                }
            } else {
                LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncWithItemName({
                    inReturnData: LocalReturnData,
                    inItemName: inVouchersConsiderLine.ItemName
                });

                if (LocalFromLoopFunc.KTF) {
                    LocalReturnObject.KTF = true;
                    LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                } else {
                    LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                };
            };
        }
    } else {
        if ("ItemNameConsider" in inVouchersConsiderLine) {
            if (inVouchersConsiderLine.ItemNameConsider) {
                LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncWithItemName({
                    inReturnData: LocalReturnData,
                    inItemName: inVouchersConsiderLine.ItemName
                });

                if (LocalFromLoopFunc.KTF) {
                    LocalReturnObject.KTF = true;
                    LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                } else {
                    LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                };
            } else {
                LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncFromJsonFileComplete({
                    inReturnData: LocalReturnData
                });
                if (LocalFromLoopFunc.KTF) {
                    LocalReturnObject.KTF = true;
                    LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                } else {
                    LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                };
            }
        };
    };

    return await LocalReturnObject;
};

module.exports = { StartFunc }