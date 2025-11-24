import { v4 as uuidv4 } from 'uuid'
import { Event } from '../db/models/event.js'
export async function trackEvent({
  postId,
  action,
  session = uuidv4(),
  date = Date.now(),
}) {
  const event = new Event({ post: postId, action, session, date })
  return await event.save()
}

export async function getTotalViews(postId) {
  return {
    views: await Event.countDocuments({ post: postId, action: 'startView' }),
  }
}

export async function getDailyViews(postId) {
  return await Event.aggregate([
    {
      $match: {
        post: postId,
        action: 'startView',
      },
    },

    {
      $group: {
        _id: {
          $dateTrunc: { date: '$date', unit: 'day' },
        },
        views: { $count: {} },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ])
}

export async function getDailyDurations(postId) {
  return await Event.aggregate([
    {
      $match: {
        post: postId,
      },
    },
    {
      $project: {
        session: '$session',
        startDate: {
          $cond: [{ $eq: ['$action', 'startView'] }, '$date', undefined],
        },
        endDate: {
          $cond: [{ $eq: ['$action', 'endView'] }, '$date', undefined],
        },
      },
    },
    {
      $group: {
        _id: '$session',
        startDate: { $min: '$startDate' },
        endDate: { $max: '$endDate' },
      },
    },

    {
      $project: {
        day: { $dateTrunc: { date: '$startDate', unit: 'day' } },
        duration: { $subtract: ['$endDate', '$startDate'] },
      },
    },
    {
      $group: {
        _id: '$day',
        averageDuration: { $avg: '$duration' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ])
}
//NEW MILESTONE 2 - ADDITION
export async function getTopPosts(limit = 3) {
  const results = await Event.aggregate([
    {
      $match: {
        action: 'startView',
      },
    },
    {
      $group: {
        _id: '$post',
        views: { $count: {} },
      },
    },
    {
      $sort: {
        views: -1,
      },
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: '_id',
        as: 'post',
      },
    },
    {
      $unwind: '$post',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'post.author',
        foreignField: '_id',
        as: 'post.author',
      },
    },
    {
      $unwind: '$post.author',
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ['$post', { views: '$views' }],
        },
      },
    },
  ])

  // Transform _id to id for consistency with other post queries
  return results.map((post) => ({
    ...post,
    id: post._id.toString(),
  }))
}
// END NEW MILESTONE 2 - ADDITION
