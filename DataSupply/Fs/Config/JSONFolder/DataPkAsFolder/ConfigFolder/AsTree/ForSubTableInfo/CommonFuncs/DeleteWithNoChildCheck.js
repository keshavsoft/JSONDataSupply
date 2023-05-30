
const StartFunc = ({ inData }) => {
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

module.exports = { StartFunc };
