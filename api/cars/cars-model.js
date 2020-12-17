const db = require('../../data/dbConfig')

module.exports = {
    add(car) {
        return db('cars')
                .insert(car)
                .then(([id]) => {
                    return db('cars')
                            .where('id', id)
                            .first()
                })
    },
    delete(id) {
        return db('cars')
                .where('id', id)
                .del()
    },
    findById(id) {
        return db('cars')
                .where('id', id)
                .first()
    }
}