const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    fullname: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
})

const Vocabulary = sequelize.define('vocabulary', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    language: {type: DataTypes.STRING}
})

const VocabularyTerm = sequelize.define('vocabulary_term', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Term = sequelize.define('term', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    word: {type: DataTypes.STRING},
    translation: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING, allowNull: true},
    translation: {type: DataTypes.STRING, allowNull: true}
})


User.hasMany(Vocabulary)
Vocabulary.belongsTo(User)

Vocabulary.belongsToMany(Term, {through: VocabularyTerm})
Term.belongsToMany(Vocabulary, {through: VocabularyTerm})

module.exports = {
    User, Vocabulary, VocabularyTerm, Term
}