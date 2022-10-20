let LoopTableColumnsWithKeysNeeded = ({ inTableColumns, inKeysNeeded }) => {
    let LocalReturnObject = {};

    inTableColumns.forEach(LoopTableColumn => {
        LocalReturnObject[LoopTableColumn.pk] = {};

        inKeysNeeded.forEach(element => {
            LocalReturnObject[LoopTableColumn.pk][element] = LoopTableColumn[element];
        });
    });

    return LocalReturnObject;
};

module.exports = {
    LoopTableColumnsWithKeysNeeded
}