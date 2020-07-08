const {MovieType, CharactersType, CommentType} = require('./type');
const {CommentIType, CharacterByGenderIType, CharacterBySortIType} = require('./input');

const Types = {
    inputType: {
        CommentIType,
        SortIType: CharacterBySortIType,
        CharacterByGenderIType
    },
    type: {
        Movies: MovieType,
        Characters: CharactersType,
        Comments: CommentType,
    }
};

module.exports = Types;