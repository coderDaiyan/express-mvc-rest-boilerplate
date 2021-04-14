const Model = require('../model/Model.model.js')


// POST http://example.com/api/create { name: "Salman", email : 'samayunmc99@gmail.com }
exports.create = async (req, res, next) => {
    try {
        let resource = new Model(req.body);
        let response = await resource.save();
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}
// GET http://example.com/api/read
exports.read = async (req, res, next) => {
    try {
        let resources = await Model.find({});
        res.json(resources);
    } catch (error) {
        next(error);
    }
}
// GET http://example.com/api/show/69788abc545454
exports.show = async (req, res, next) => {
    try {
        let resource = await Model.findOne({ _id: req.params.id }).exec();
        if (resource) {
            res.json(resource);
        } else {
            next(new Error(`${req.params.id} resource is not availavle`));
        }
    } catch (error) {
        next(new Error(`${req.params.id} resource is not available`));
    }
}
// PUT http://example.com/api/update/69788abc545454 { name: "Samayun", email : 'samayunmc99@gmail.com }
exports.update = async (req, res, next) => {
    try {
        let updatedResource = await Model.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedResource);
    } catch (error) {
        next(error);
    }
}
// DELETE http://example.com/api/delete/69788abc545454
exports.destroy = async (req, res, next) => {
    try {
        let resource = await Model.findByIdAndDelete(req.params.id);
        res.status(200).json(resource);
    } catch (error) {
        next(error);
    }
}
// DELETE http://example.com/api/bulk {selectedResource : ['69788abc545454', '50088abc545454' ]}
exports.bulk = async (req, res, next) => {
    try {
        const { selectedResource } = req.body;
        let deleted = await Model.deleteMany(selectedResource);
        if (deleted) {
            res.json(deleted);
        } else {
            next(new Error(`Resources Not Deleted`));
        }
    } catch (error) {
        next(error);
    }
}