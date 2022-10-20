const fs = require('fs');
let CommonAbsolutePath = require("../DataPath");
let path = require("path");

let FoldersAsObject = ({ inUserPK }) => {
    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
    const LocalTemplatesPath = `${LocalDataPath}/${inUserPK}/TemplatesCommonWithFileNameJson`;
    let LocalFolderPath;
    let LocalScreens;
    let LocalScreenValues;
    let LocalReturnObject = {};
    const readDirMain = fs.readdirSync(LocalTemplatesPath);

    readDirMain.forEach((FirstFolder) => {
      //  console.log("FirstFolder : ", FirstFolder);
        if (fs.lstatSync(`${LocalTemplatesPath}/${FirstFolder}`).isDirectory()) {
            LocalReturnObject[FirstFolder] = {};

            const readFirstFolder = fs.readdirSync(`${LocalTemplatesPath}/${FirstFolder}`);

            readFirstFolder.forEach((SecondFolder) => {
          //      console.log("SecondFolder : ", SecondFolder);
                if (fs.lstatSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}`).isDirectory()) {
                    LocalReturnObject[FirstFolder][SecondFolder] = {};

                    const readSecondFolder = fs.readdirSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}`);

                    readSecondFolder.forEach((ThirdFolder) => {
                     //   console.log("ThirdFolder : ", ThirdFolder);
                        if (fs.lstatSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}/${ThirdFolder}`).isDirectory()) {
                            LocalReturnObject[FirstFolder][SecondFolder][ThirdFolder] = {};

                            let LocalFiles = fs.readdirSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}/${ThirdFolder}`);

                            LocalFiles.forEach((LoopScreenFiles) => {
                                LocalReturnObject[FirstFolder][SecondFolder][ThirdFolder][path.parse(LoopScreenFiles).name] = JSON.parse(fs.readFileSync(`${LocalTemplatesPath}/${FirstFolder}/${SecondFolder}/${ThirdFolder}/${LoopScreenFiles}`));
                            });

                        };
                    });
                };
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