const axios = require('../service/axios');
const {orderBy, filterBy, mergeComments, create_comment, get_all_comments, metaData} = require('../helpers');

const {
    type: {Movies, Comments, Characters},
    inputType: {CommentIType, CharacterByGenderIType, SortIType}
} = require('./types');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
} = require('graphql');


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Get Movies, Comments, Characters",
    fields: {
        movies: {
            description: 'Returns all MOVIES data sorted by release date',
            type: GraphQLList(Movies),
            resolve: async () => {
                const {data: {results}} = await axios.get('films/');
                return await mergeComments(orderBy(results, 'release_date', 'asc'));
            }
        },
        comments: {
            description: 'Returns all COMMENTS in reverse chronological order',
            type: GraphQLList(Comments),
            resolve: async () => {
                let rows = await get_all_comments();
                return orderBy(rows, 'id', 'dsc');
            }
        },
        characters: {
            description: 'Returns Characters by Sort or filter, without parameters all results are returned',
            type: GraphQLList(Characters),
            args: {sort: {type: SortIType}, gender: {type: CharacterByGenderIType},},
            resolve: async (parent, args,) => {
                let tempData = [];
                let {data: {results:data}} = await axios.get('people/');
                let results = [{character_data: data, meta_data:{}}];
                const {sort, gender} = args;

                // return if no parameter passed
                if (!Object.entries(args).length) {
                    return metaData(results)
                }


                if (args.hasOwnProperty('sort') && !tempData) {
                    tempData = orderBy(results, sort.name, sort.flow, 'character_data')
                } else if (args.hasOwnProperty('sort')) {
                    tempData = orderBy(tempData, sort.name, sort.flow, 'character_data')
                }

                if (args.hasOwnProperty('gender') && !tempData) {
                    tempData = filterBy(results, 'gender', gender, 'character_data')
                } else if (args.hasOwnProperty('gender')) {
                    tempData = filterBy(tempData, 'gender', gender, 'character_data')
                }

                // if (tempData){
                //     tempData = [{...tempData[0],extras: {total_characters: '40', total_height:{cm:'40', feet:'30', inches:'20'}}}]
                // }


                return metaData(tempData)
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Add comments to episode",

    fields: () => ({
        comment: {
            type: GraphQLNonNull(Comments),
            args: {
                comment: {type: GraphQLNonNull(CommentIType)},
            },
            resolve: async (parent, args, context) => {
                const ip = context.ip;
                const {comment: {comment, episode}} = args;

                if (comment.length > 500) {
                    throw new Error('Comment must be less than 500 words')
                }

                return await create_comment(ip, episode, comment)
            }
        }
    }),

});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});