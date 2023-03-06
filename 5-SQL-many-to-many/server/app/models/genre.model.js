module.exports = (sequelize, Sequelize) => {
    const genre = sequelize.define("genre", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

    }, { timestamps: false });
    
    return genre;
};