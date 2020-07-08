const {orderBy, filterBy, sumNum, mergeComments, metaData} = require('./_function_queries');
const {get_all_comments, create_comment} = require('./db_queries');


const helpers = {
    orderBy,
    filterBy,
    sumNum,
    mergeComments,
    create_comment,
    get_all_comments,
    metaData,

};

module.exports = helpers;