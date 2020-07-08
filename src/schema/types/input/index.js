const {GraphQLString, GraphQLNonNull, GraphQLInputObjectType, GraphQLEnumType} = require('graphql');

const CommentIType = new GraphQLInputObjectType({
    name: "CommentIType",
    fields: () => ({
        episode: {type: GraphQLNonNull(GraphQLString)},
        comment: {type: GraphQLString},
    })
});

const CharacterBySortIType = new GraphQLEnumType({
    name: 'CharacterBySortIType',
    values: {
        name_asc: {value: {name: 'name', flow: 'asc'}, description: 'sort name in ascending order'},
        name_dsc: {value: {name: 'name', flow: 'dsc'}, description: 'sort name in descending order'},
        height_asc: {value: {name: 'height', flow: 'asc'}, description: 'sort name in ascending order'},
        height_dsc: {value: {name: 'height', flow: 'dsc'}, description: 'sort name in descending order'},
    }
});

const CharacterByGenderIType = new GraphQLEnumType({
    name: "CharacterByGenderIType",
    values: {
        male: {value: 'male', description: 'search males only'},
        female: {value: 'female', description: 'search females only'},
        none: {value: 'n/a', description: 'search "n/a" only'}
    }
});


module.exports = {CommentIType, CharacterBySortIType, CharacterByGenderIType};