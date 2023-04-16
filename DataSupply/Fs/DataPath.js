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

    switch (LocalPlatform) {
        case "darwin":
            LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.darwinPath}`);

            break;
        case "linux":
            LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.UbuntuPath}`);
            break;

        default:
            LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.WinPath}`);
            break;
    }

    // if (LocalPlatform === "linux") {
    //     LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.UbuntuPath}`);
    // } else {
    //     LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.WinPath}`);
    // };

    return LocalReturnPath;
};

exports.ReturnAbsoluteKDataPath = () => {
    let LocalPlatform = os.platform();
    let LocalReturnPath;
    let CommonDataPath = require("../Kprivate/DataPath.json");

    switch (LocalPlatform) {
        case "darwin":
            LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.KDataPath.darwinPath}`);

            break;
        case "linux":
            LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.KDataPath.UbuntuPath}`);
            break;

        default:
            LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.KDataPath.WinPath}`);
            break;
    }

    // if (LocalPlatform === "linux") {
    //     LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.UbuntuPath}`);
    // } else {
    //     LocalReturnPath = path.resolve(__dirname + `/../../${CommonDataPath.DataPath.WinPath}`);
    // };

    return LocalReturnPath;
};