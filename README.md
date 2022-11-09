# Tech-Blog

# Description

Javascript is used by programmers across the world to create dynamic and interactive web content like applications and browsers. JavaScript is so popular that it's the most used programming language in the world, used as a client-side programming language by 97.0% of all websites

Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies.

Deploy link []

# Table of Content

1. [HomePage](#homepage)
2. [AccAcceptanceCriteria](#accAcceptancecriteria)
3. [CodeSnippet](#codesnippet)
4. [Tools](#tools)
5. [Prerequisites](#prerequisites)
6. [AuthorLinks](#authorlinks)

# HomePage

![pic](./img/dashh1.PNG)

# AccAcceptanceCriteria

- GIVEN a CMS-style blog site
- WHEN I visit the site for the first time
- THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
- WHEN I click on the homepage option
- THEN I am taken to the homepage
- WHEN I click on any other links in the navigation
- THEN I am prompted to either sign up or sign in
- WHEN I choose to sign up
- THEN I am prompted to create a username and password
- WHEN I click on the sign-up button
- THEN my user credentials are saved and I am logged into the site
- WHEN I revisit the site at a later time and choose to sign in
- THEN I am prompted to enter my username and password
- WHEN I am signed in to the site
- THEN I see navigation links for the homepage, the dashboard, and the option to log out
- WHEN I click on the homepage option in the navigation
- THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
- WHEN I click on an existing blog post
- THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
- WHEN I enter a comment and click on the submit button while signed in
- THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
- WHEN I click on the dashboard option in the navigation
- THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
- WHEN I click on the button to add a new blog post
- THEN I am prompted to enter both a title and contents for my blog post
- WHEN I click on the button to create a new blog post
  -THEN the title and contents of my post are saved and - I am taken back to an updated dashboard with my new blog post
- WHEN I click on one of my existing posts in the dashboard
- THEN I am able to delete or update my post and taken back to an updated dashboard
- WHEN I click on the logout option in the navigation
- THEN I am signed out of the site
- WHEN I am idle on the site for more than a set time
- THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments

# CodeSnippet

```const Users = require("./Users");
const Posts = require("./Posts");
const Comments = require("./Comments");

//create associations
Users.hasMany(Posts, {
  foreignKey: "user_id",
});

Posts.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comments.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comments.belongsTo(Posts, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

Users.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Posts.hasMany(Comments, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

module.exports = { Users, Posts, Comments };

```

# Tools

1. VsCode
2. Git (windows)
3. Github
4. MySQL2 package
5. Dotenv package
6. Sequelize
7. express-handlebars
8. bcrypt package
9. express-session
10. connect-session-sequelize

# Prerequisites

Software need to be install

- Vscode
- git
- github(clone project)
- npm install

# AuthorLinks

[Github](https://github.com/akash2040/Tech-Blog)
