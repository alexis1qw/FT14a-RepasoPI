const Sequelize = require("sequelize");
const { STRING, ENUM, VIRTUAL, TEXT } = Sequelize.DataTypes;

const db = new Sequelize("postgres://postgres:1234@localhost:5432/pokemon", {
  logging: false,
});

const Page = db.define("page", {
  title: { type: STRING, allowNull: false },
  urlTitle: { type: STRING, allowNull: false },
  content: { type: TEXT, allowNull: false },
  status: { type: ENUM("open", "closed"), allowNull: true },
  route: {
    type: VIRTUAL,
    allowNull: true,
    get() {
      return `/pages/${this.getDataValue('urlTitle')}`;
    },
  },
});

Page.addHook("beforeValidate", (page) => {
  if (page) {
    page.urlTitle = page.title.replace(/\s+/g, "_").replace(/\W/g, "");
  }
});

const User = db.define("user", {
  name: { type: STRING, allowNull: false },
  email: { type: STRING, allowNull: false, unique: true },
});

const Category = db.define("category", {
  name: { type: STRING, allowNull: false, unique: true },
  description: { type: STRING, allowNull: true },   
});

User.hasMany(Page);
Page.belongsTo(User);

Page.belongsToMany(Category, { through: "page_category" });
Category.belongsToMany(Page, { through: "page_category" });

module.exports = {
  User,
  Page,
  Category,
  db,
};
