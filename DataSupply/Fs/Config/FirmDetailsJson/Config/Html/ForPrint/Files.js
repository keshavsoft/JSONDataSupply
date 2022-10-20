let CommonFromJson = require("../../../PullData/FromJson");

let ForPrint = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, JsonData: "", CreatedLog: {}, KReason: "" };
    let LocalDataPK = inDataPK;
    if (LocalDataPK > 0) {

        let LocalFromJson = await CommonFromJson.StartFunc({ inUserPK: LocalDataPK });

        if ("Firm" in LocalFromJson) {
            if ("Config" in LocalFromJson.Firm) {
                if ("Html" in LocalFromJson.Firm.Config) {
                    if ("ForPrint" in LocalFromJson.Firm.Config.Html) {
                        if ("Files" in LocalFromJson.Firm.Config.Html.ForPrint) {
                            LocalReturnData.JsonData = LocalFromJson.Firm.Config.Html.ForPrint.Files;
                            LocalReturnData.KTF = true;
                        } else {
                            LocalReturnData.KReason = "Files not found in Firm.Config.Html.ForPrint";
                        };
                    } else {
                        LocalReturnData.KReason = "ForPrint not found in Firm.Config.Html";
                    };
                } else {
                    LocalReturnData.KReason = "Html not found in Firm.Config";
                };

            } else {
                LocalReturnData.KReason = "Config not found in Firm";
            };

        } else {
            LocalReturnData.KReason = "Firm not found";
        }
    };

    return await LocalReturnData;
};


module.exports = { ForPrint }
