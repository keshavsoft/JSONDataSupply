let path = require("path");

let os = require("os");

// exports.ReturnAbsolutePath = ({ inPresentDirectory }) => {
//     let LocalPlatform = os.platform();
//     let LocalReturnPath;

//     if (LocalPlatform === "linux") {
//         LocalReturnPath = `${inPresentDirectory}/${CommonDataPath.DataPath.UbuntuPath}`;
//     } else {
//         LocalReturnPath = `${inPresentDirectory}\\${CommonDataPath.DataPath.WinPath}`;
//     };
//     //console.log("LocalReturnPath : ", LocalReturnPath);
//     return LocalReturnPath;
// };

exports.ReturnAbsolutePathOfPresentApp = () => {
    let LocalPlatform = os.platform();
    let LocalReturnPath;
    let CommonDataPath = require("../Kprivate/DataPath.json");

    if (LocalPlatform === "linux") {
        LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.UbuntuPath}`);
    } else {
        LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.WinPath}`);
    };

    return LocalReturnPath;
};