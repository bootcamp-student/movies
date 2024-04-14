import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        reviewBody: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userComment: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        reviewDate: {
            type: Date,
            default: Date.now,
        },
        spoilers: {
            type: Boolean,
            default: false,
        },
        movieYear: {
            type: Number,
        },
        movieDirector: {
            type: String,
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model('Review', ReviewSchema);