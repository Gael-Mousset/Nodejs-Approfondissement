const articleService = require("./articles.service");
const NotFoundError = require("../../errors/not-found");

class ArticleController {
  async create(req, res, next) {
    try {
      const article = await articleService.create(req.body);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).send({
          message:
            "Accès refusé. Seuls les administrateurs peuvent effectuer cette action.",
        });
      }
      const id = req.params.id;
      const data = req.body;
      const articleModified = await articleService.update(id, data);
      if (!articleModified) {
        throw new NotFoundError();
      }
      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).send({
          message:
            "Accès refusé. Seuls les administrateurs peuvent effectuer cette action.",
        });
      }

      const id = req.params.id;
      await articleService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticleController();
