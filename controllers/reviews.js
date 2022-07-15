const Resource = require('../models/resource');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    resource.reviews.push(review);
    await review.save();
    await resource.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/resources/${resource._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Resource.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/resources/${id}`);
}
