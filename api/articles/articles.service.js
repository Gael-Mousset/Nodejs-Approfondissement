const Article = require("./articles.schema");

class ArticleService {
  async getArticle(id) {
    return Article.find({ user: { _id: id } }).populate("user", "-password");
  }
  create(data) {
    const article = new Article(data);
    return article.save();
  }
  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return Article.deleteOne({ _id: id });
  }
}

module.exports = new ArticleService();
