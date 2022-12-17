const User = require("../schema/user.schema");
const Post = require("../schema/post.schema");

module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    //TODO: Implement this API
    let limit = req.query.limit;
    let skip = req.query.skip;
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
        $limit: 10 || Number(limit),
      },
      {
        $skip: 1 || Number(skip),
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
