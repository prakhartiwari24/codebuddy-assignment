const User = require("../schema/user.schema");
const Post = require("../schema/post.schema");

module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    //TODO: Implement this API
    const post = await Post.aggregate([
      {
        $group: {
          _id: "$userId",
          posts: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "userId",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },

      {
        $project: {
          user: "$user.name",
          posts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      data: {
        users: post,
      },

      message: "Implement this API",
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports.getUsersPagination = async (req, res) => {
  try {
    //TODO: Implement this API
    let limit = req.query.limit;
    let skip = req.query.skip;
    let page = req.query.page;
    const postCount = await Post.count();
    const post = await Post.aggregate([
      {
        $limit: 10 || Number(limit),
      },
      {
        $skip: 1 || Number(skip),
      },
    ]);

    res.status(200).json({
      pagination: {
        totalDocs: postCount,
        limit: limit,
        page: page,
        totalPages: postCount,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null,
        nextPage: 2,
      },
      message: "Implement this API",
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};
