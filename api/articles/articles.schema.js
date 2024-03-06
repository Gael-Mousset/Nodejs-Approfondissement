const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} inconnue",
    },
  },
});

let Article;

module.exports = Article = model("Article", articleSchema);

/*const id = "65e7188a2892179a617d88fd";

async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: {
      user: {
        _id: id,
      },
    },
  });
  console.log(articles.filter((article) => article.user));
}

test();*/
