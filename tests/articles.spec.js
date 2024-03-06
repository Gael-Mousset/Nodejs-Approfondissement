const request = require("supertest");
const { app } = require("../server"); // Assurez-vous que le chemin est correct
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema"); // Assurez-vous que le chemin est correct

describe("Article API tests", () => {
  let token;
  const USER_ID = "65e7188a2892179a617d88fd"; // Utilisez une valeur factice qui sera reconnue par vos mocks
  const ARTICLE_ID = "fakeArticle"; // ID factice pour les tests
  const MOCK_ARTICLE = {
    _id: ARTICLE_ID,
    title: "Test Article",
    content: "This is a test article",
    user: USER_ID,
  };
  const MOCK_CREATE_ARTICLE = {};

  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
    // Mock pour les différentes opérations
    mockingoose(Article).toReturn(MOCK_ARTICLE, "save"); // Pour la création
    mockingoose(Article).toReturn(MOCK_ARTICLE, "findOneAndUpdate"); // Pour la mise à jour
    mockingoose(Article).toReturn({}, "deleteOne"); // Pour la suppression
  });

  test("Create Article", async () => {
    const res = await request(app).post("/api/articles").send({
      title: MOCK_ARTICLE.title,
      content: MOCK_ARTICLE.content,
      user: USER_ID,
    });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_ARTICLE.title);
  });

  test("Update Article", async () => {
    const updatedContent = "Updated content";
    const res = await request(app)
      .put(`/api/articles/${ARTICLE_ID}`)
      .send({
        ...MOCK_ARTICLE,
        content: updatedContent,
      });
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.content).toBe(updatedContent);
  });

  test("Delete Article", async () => {
    const res = await request(app).delete(`/api/articles/${ARTICLE_ID}`);
    expect(res.status).toBe(204);
  });
});
