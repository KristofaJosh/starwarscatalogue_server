const {GraphQLInt, GraphQLList, GraphQLFloat} = require("graphql");

const {GraphQLString, GraphQLObjectType,} = require('graphql');


const CommentType = new GraphQLObjectType({
    name: "Comments",
    fields: () => ({
        episode: {type: GraphQLString},
        ip: {type: GraphQLString},
        comment: {type: GraphQLString},
        created_at: {type: GraphQLString},
    })
});

const HeightType = new GraphQLObjectType({
    name: "HeightsConversion",
    fields: () => ({
        cm: {type: GraphQLFloat},
        feet: {type: GraphQLFloat},
        inches: {type: GraphQLFloat},
    })
});

const MetaDataType = new GraphQLObjectType({
    name: "MetaData",
    fields: () => ({
        total_height: {type: HeightType},
        total_characters: {type: GraphQLInt},
    })
});


const CharactersObjectType = new GraphQLObjectType({
    name: "CharactersObjectType",
    fields: () => ({
        name: {type: GraphQLString},
        height: {type: GraphQLString},
        gender: {type: GraphQLString},
        birth_year: {type: GraphQLString},
        hair_color: {type: GraphQLString},
        skin_color: {type: GraphQLString},
        homeworld: {type: GraphQLString},
        created: {type: GraphQLString},
        edited: {type: GraphQLString},
        films: {type: GraphQLList(GraphQLString)},
        vehicles: {type: GraphQLList(GraphQLString)},
        starships: {type: GraphQLList(GraphQLString)},
        species: {type: GraphQLList(GraphQLString)},
    })
});

const CharactersType = new GraphQLObjectType({
    name: "Characters",
    description: "all character property",
    fields: () => ({
        character_data: {type: GraphQLList(CharactersObjectType)},
        meta_data: {type:  MetaDataType}
    })
});


const MovieType = new GraphQLObjectType({
    name: "Films",
    fields: () => ({
        title: {type: GraphQLString},
        episode_id: {type: GraphQLString},
        release_date: {type: GraphQLString},
        opening_crawl: {type: GraphQLString},
        comments: {type: GraphQLList(CommentType)},
        comment_count: {type: GraphQLInt, description: 'total comment on an episode'},
    })
});

module.exports = {MovieType, CommentType, CharactersType};
