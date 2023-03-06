module.exports = (sequelize, Sequelize) => {
    const movie = sequelize.define("movie", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },       
    },{timestamps: false});
    
    return movie;
};