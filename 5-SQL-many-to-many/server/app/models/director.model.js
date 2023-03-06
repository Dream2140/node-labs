module.exports = (sequelize, Sequelize) => {
    const director = sequelize.define("director", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        fullName: {
            type: Sequelize.STRING
        },
        birth: {
            type: Sequelize.STRING(4)
        },
    },{timestamps: false});
    
    return director;
};