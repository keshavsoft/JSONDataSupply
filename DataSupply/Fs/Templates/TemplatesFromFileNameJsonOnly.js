const fs = require('fs');
let CommonAbsolutePath = require("../DataPath");
let path = require("path");

let FoldersAsObject = ({ inUserPK }) => {
    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
    const LocalTemplatesPath = `${LocalDataPath}/${inUserPK}/TemplatesFromFileNameJsonOnly`;
    let LocalReturnObject = {};
    const readDirMain = fs.readdirSync(LocalTemplatesPath);

    //console.log("readDirMain : ", readDirMain);

    readDirMain.forEach((FirstFolder) => {
        //  console.log("FirstFolder : ", FirstFolder);
        if (fs.lstatSync(`${LocalTemplatesPath}/${FirstFolder}`).isDirectory()) {
            LocalReturnObject[FirstFolder] = {};

            const readFirstFolder = fs.readdirSync(`${LocalTemplatesPath}/${FirstFolder}`);

            readFirstFolder.forEach((SecondFolder) => {
                if (fs.lstatSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}`).isDirectory()) {
                    LocalReturnObject[FirstFolder][SecondFolder] = {};

                    let LocalFiles = fs.readdirSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}`);

                    LocalFiles.forEach((LoopScreenFiles) => {
                        LocalReturnObject[FirstFolder][SecondFolder][path.parse(LoopScreenFiles).name] = JSON.parse(fs.readFileSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}/${LoopScreenFiles}`));
                    });

                };

                // if (fs.lstatSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}`).isDirectory()) {
                //     LocalReturnObject[FirstFolder][SecondFolder] = {};

                //     const readSecondFolder = fs.readdirSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}`);

                //     readSecondFolder.forEach((ThirdFolder) => {

                //     });
                // };

            });
            // if (fs.existsSync(LocalFolderPath)) {
            //     if (fs.lstatSync(LocalFolderPath).isDirectory()) {
            //         LocalReturnObject[dirNext][] = {};

            //         if (fs.existsSync(LocalFolderPath)) {
            //             if (fs.lstatSync(LocalFolderPath).isDirectory()) {

            //             };
            //         };

            //         // LocalScreens = fs.readdirSync(LocalFolderPath);

            //         // LocalScreens.forEach((LoopScreen) => {
            //         //     LocalReturnObject[dirNext][LoopScreen] = {};

            //         //     LocalScreenValues = fs.readdirSync(`${LocalFolderPath}/${LoopScreen}`);

            //         //     LocalScreenValues.forEach((LoopScreenFiles) => {
            //         //         LocalReturnObject[dirNext][LoopScreen][path.parse(LoopScreenFiles).name] = JSON.parse(fs.readFileSync(`${LocalFolderPath}/${LoopScreen}/${LoopScreenFiles}`));
            //         //     });
            //         // });

            //     };
            // };
        };
    });




    // console.log("LocalReturnObject : ", LocalReturnObject);
    return LocalReturnObject;
};

module.exports = { FoldersAsObject };