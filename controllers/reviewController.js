import Review from '../models/ReviewModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

export const getAllReviews = async (req, res) => {
  const { search, reviewStatus, reviewType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (reviewStatus && reviewStatus !== 'all') {
    queryObject.reviewStatus = reviewStatus;
  }
  if (reviewType && reviewType !== 'all') {
    queryObject.reviewType = reviewType;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reviews = await review.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalReviews = await Review.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalReviews / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalReviews, numOfPages, currentPage: page, reviews });
};

export const createReview = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

export const getReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  res.status(StatusCodes.OK).json({ review });
};

export const updateReview = async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'review modified', review: updatedReview });
};

export const deleteReview = async (req, res) => {
  const removedReview = await Review.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'review deleted', review: removedReview });
};

export const showStats = async (req, res) => {
  let stats = await Review.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$reviewStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    reviewed: stats.reviewed || 0,
    rotten: stats.rotten || 0,
  };

  let monthlyApplications = await Review.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
