'use strict';
class SalesCollection {

    constructor(model) {
        this.model = model;
    }
    get(category) {
        if (category) {
            return this.model.findAll({where:{category:category}});
        } else {
            return this.model.findAll({});
        }
    }

    create(record) {
        return this.model.create(record);
    }

    update(id, data) {
        return this.model.findOne({where: {id:id}})
            .then(record => record.update(data));
    }

    delete(id) {
        return this.model.destroy({where: { id : id  } });
    }
}

module.exports = SalesCollection;