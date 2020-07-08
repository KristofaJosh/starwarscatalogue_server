const {get_all_comments} = require("../db_queries");
module.exports.orderBy = (list, sortBy, flow = 'asc', step = undefined) => {

    console.log('sortBy: ', sortBy, '. flow: ', flow, '. step: ', step);

    if (step) {
        list = list[0][step];
    }

    let result = sortBy ?
        list.sort((a, b) => flow === 'asc' ?
            a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]) : flow === 'dsc' ?
            list.sort((a, b) => a - b) : list;

    return [{[step]: result, meta_data: {}}]
};

module.exports.filterBy = (list, filter, value = '', step) => {

    if (step) {
        list = list[0][step];
    }

    console.log('filter: ', filter, '==: ', value, 'step: ', step);

    let result = list.filter(el => el[filter] === value);

    return [{[step]: result, meta_data: {}}]
};


module.exports.mergeComments = async (_list) => {
    let comments = await get_all_comments();

    console.log('merge comments ...');
    let list = await _list.slice();
    list['total_comments'] = 0;
    for (let movie of list) {
        movie['comments'] = [];
        for (let comment of comments) {
            if (parseInt(movie.episode_id) === parseInt(comment.episode)) {
                movie['comment_count'] = movie.comments.length + 1;
                list['total_comments']++;
                movie.comments[movie.comments.length] = comment
            }
        }
    }

    return list
};


module.exports.metaData = (list) => {
    console.log('calculate metaData ...');

    console.log('meta: ', list);

    const toFt = (va) => parseInt(va) / 30.48;

    const toInch = (va) => parseInt(va) / 2.54;


    for (let el of list) {
        let height_total = 0;
        height_total += el.character_data.reduce((acc, el) => acc += parseInt(el.height), 0);

        el.meta_data = {
            total_height: {cm: height_total, feet: toFt(height_total), inches: toInch(height_total)},
            total_characters: el.character_data.length
        }
    }

    // console.log(list);
    return list
};
