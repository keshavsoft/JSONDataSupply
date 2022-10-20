let _ = require("lodash");

let SortData = ({ inDataToSort, inOrderByColumnsArray }) => {
    //let LocalReturnArray = _.sortBy(inDataToSort, inOrderByColumnsArray);
    let LocalReturnArray = _.orderBy(inDataToSort, inOrderByColumnsArray);

    return LocalReturnArray;
};

let SortWithSign = ({ inDataToSort, inOrderByColumnsArray, inSortArray }) => {
    //   console.log("inOrderByColumnsArray, inSortArray : ", inOrderByColumnsArray, inSortArray);
    let LocalReturnArray = _.orderBy(inDataToSort, inOrderByColumnsArray, inSortArray);
   // console.log("inOrderByColumnsArray, inSortArray : ",inDataToSort, inOrderByColumnsArray, inSortArray, LocalReturnArray);

    return LocalReturnArray;
};

module.exports = {
    SortData,
    SortWithSign
};