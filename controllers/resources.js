const Resource = require('../models/resource');

module.exports.index = async (req, res) => {
    const resources = await Resource.find({});
    res.render('resources/index', { resources })
}

module.exports.renderNewForm = (req, res) => {
    res.render('resources/new');
}

module.exports.createResource = async (req, res, next) => {
    const resource = new Resource(req.body.resource);
    resource.author = req.user._id;
    await resource.save();
    req.flash('success', 'Successfully made a new resource!');
    res.redirect(`/resources/${resource._id}`)
}

module.exports.showResource = async (req, res,) => {
    const resource = await Resource.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!resource) {
        req.flash('error', 'Cannot find that resource!');
        return res.redirect('/resources');
    }
    res.render('resources/show', { resource });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const resource = await Resource.findById(id)
    if (!resource) {
        req.flash('error', 'Cannot find that resource!');
        return res.redirect('/resources');
    }
    res.render('resources/edit', { resource });
}

module.exports.updateResource = async (req, res) => {
    const { id } = req.params;
    const resource = await Resource.findByIdAndUpdate(id, { ...req.body.resource });
    req.flash('success', 'Successfully updated resource!');
    res.redirect(`/resources/${resource._id}`)
}

module.exports.deleteResource = async (req, res) => {
    const { id } = req.params;
    await Resource.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted resource')
    res.redirect('/resources');
}