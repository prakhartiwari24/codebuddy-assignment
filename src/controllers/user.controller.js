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
        $limit: Number(limit),
      },
      {
        $skip: Number(skip),
      },
      {
        $project: {
          user: "$user.name",
          posts: 1,
          _id: 0,
        },
      },
    ]);

    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;

    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    console.log(`skip ${skip} limit ${limit}`);

    res.status(200).json({
      status: "success",
      users: {
        post,
      },
      message: "Implement this API",
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};
