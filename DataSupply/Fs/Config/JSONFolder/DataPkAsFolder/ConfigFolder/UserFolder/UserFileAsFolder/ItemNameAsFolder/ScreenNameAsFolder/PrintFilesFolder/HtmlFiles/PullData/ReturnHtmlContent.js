let path = require("path");
let CommonFromCheck = require("../../Check");
let fs = require("fs");


let LocalGetFiles = ({ inPath }) => {
    return fs.readdirSync(inPath).map(function (file) {
        //return fs.readFileSync(inPath + '/' + file);
        let LoopInsideReturn = {};
        LoopInsideReturn[path.parse(file).name] = fs.readFileSync(inPath + '/' + file, 'utf8');

        //        console.log("LoopInsideReturn : ", LoopInsideReturn);

        return LoopInsideReturn;

        //  fs.readFileSync(inPath + '/' + file);

    });
};

let LocalGetFiles1 = ({ inPath }) => {
    fs.readdir(inPath, function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            //   process.exit(1);
        };
        let LocalReturnObject = {};

        files.forEach(function (file, index) {
            var fromPath = path.join(inPath, file);

            let LoopInsideHtmlContent = fs.readFileSync(fromPath);
            LocalReturnObject[path.parse(file).name] = LoopInsideHtmlContent;


        });
        console.log("LoopInsideHtmlContent.", LocalReturnObject);
        return LocalReturnObject;
    });
};

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromCheck;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalItemName = inItemName;
        let LocalScreenName = inScreenName;
        let LocalPrintFilesFolderName = "PrintFiles";

        LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalItemName,
            inScreenName: LocalScreenName,
            inDataPK: LocalDataPK
        });

        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };
        //console.log('LocalFromCommonFromCheck------------- : ', LocalFromCommonFromCheck);

        let LocalFromGetFiles = LocalGetFiles({ inPath: LocalFromCommonFromCheck.PrintFilesPath });
        LocalReturnObject.KTF = true;
        LocalReturnObject.HtmlData = LocalFromGetFiles;
        //console.log("LocalFromGetFiles : ", LocalFromGetFiles);
        // LocalReturnObject.ScreenNamePath = LocalFromCommonFromCheck.ScreenNamePath;
        // LocalReturnObject.PrintFilesPath = `${LocalReturnObject.ScreenNamePath}/${LocalPrintFilesFolderName}`;

        // try {
        //     if (fs.statSync(LocalReturnObject.PrintFilesPath).isDirectory()) {
        //         LocalReturnObject.KTF = true;
        //     } else {
        //         LocalReturnObject.KReason = `PrintFilesPath not found!`;
        //     }
        // } catch (error) {
        //     LocalReturnObject.KReason = error;
        // };

    };

    return await LocalReturnObject;
};

// StartFunc({
//     inFolderName: "Transactions",
//     inFileNameWithExtension: "GST-SALES.json",
//     inItemName: "GST-SALE",
//     inScreenName: "Print",
//     inDataPK: 1022
// }).then(p => {
//     console.log("pppp : ", p);
// });

// FromJsonConfig({
//     inJsonConfig:{
//         inFolderName: "Masters",
//         inJsonFileName: "Customers.json"
//     },
//     inDataPK: 16
// }).then(p => {
//     console.log("pppp : ", p);
// });

module.exports = {
    StartFunc
};