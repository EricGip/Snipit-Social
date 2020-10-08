# Snipit Social
A place for devs & designers to meet and share. 

## Visit [Snipit Social](https://snipit-social.herokuapp.com/)

## 📝 Description
Snipit Social is a lightweight social media web app that currently allows users to signup and login with encrypted authentication, create and edit a personal profile, author posts to share in a communal feed, and hop into chatrooms to share disappearing messages in real time. This app is designed as away for developers to connect in ways that widely-used services like GitHub do not offer, and allows for a focused way of collaborating without the all-issues nature of Twitter. No ads, no tracking or targeting, no bots. Future development and features are noted below.
<p>&nbsp;</p>

## 💾 Installation
This is a **MERN** full stack app. We built this app to store data using **MongoDB Atlas** cloud hosting. Please [see their docs for information](https://docs.atlas.mongodb.com/) regarding setting up a cluster for this app. To start your own instance, clone this repository and run ``` npm install ``` from the root directory. Then ``` cd client ``` and run another install to complete the dependencies.
* **Local Instance:** To test and develop locally, open a **MongoDB** enabled terminal window, navigate to the root directory and run ``` mongod ``` to start the server listening. Unless altered, all data will hit your cloud database by default. Then in a new terminal, run ``` npm run dev ``` from the root. This script tells npm *Concurrently* to start both servers listening at ports 3000 and 5000 respectively. Launch your browser, navigate to ``` localhost:3000 ``` and begin using Snipit Social!
* **Web Instance:** Connect your MongoDB cloud cluster to you preferred cloud platform for website hosting. We used **[Heroku](https://devcenter.heroku.com/)** to deploy this app, go here to checkout 👉 **[Snipit Social](https://snipit-social.herokuapp.com/)** in action.
<p>&nbsp;</p>

## 📲 Usage
Users start their experience at our landing page, where they may sign up for a new account or login to their existing account after signing in , users may use the navbar to travel around Snipit Social, making posts on the feed and viewing and updating their profile. They can also view others' profiles, follow or unfollow or hangout in the chatrooms. This app is a mobile-first **PWA** so users can install it on their devices and check in anytime to share new ideas.
<p>&nbsp;</p>

## 📷 Images
<img src="https://github.com/gloriousLoaf/Snipit-Social/blob/main/readme-imgs/snipit-feed.png" alt="Snipit Feed, making a post" height="225">
<p>&nbsp;</p>
<img src="https://github.com/gloriousLoaf/Snipit-Social/blob/main/readme-imgs/snipit-chat.png" alt="Snipit Feed, chat room" height="400">
<p>&nbsp;</p>

## Contributions:

First, I laid out the general foundation with help from the Express documentation, Create-React-App boilerplate, and MongoDB Atlas. 

My first functionality goal was to manage authentication. I was able to set up a Passport Google oAuth2 strategy with Context hooks on the frontend to authenticate the user, but scrapped it for a Passport JWT strategy that allowed the user to register and sign in to receive a token to verify their authentication.

Next I focused on the post functionality on both the front end and the backend by creating the Post model that requires the UserID attained by logging in, express routes to Create, Read, and Delete posts from the Mongo database with mongoose, and initially created hooks to make these API calls. 

Our cohort was brand new to React, so as beginners we initially believed that hooks were best for this small project. As we kept building we slowly began having more conflicts with state/hooks that really hindered our progress. To make things simpler, I refactored a lot of our codebase from functional components into class components to take advantage of Redux's power to manage multiple states. I put a lot of extra hours into learning redux when our class only covered hooks, so I made sure to change only what I had to.
   * David made a great GitHub oAuth connection with Hooks and was still able to get it running with our redux setup!

After setting up redux, I created the profile page and navigation bar functionality to your profile found by your unique Id. The profile page has API calls to gather your own posts that you created, and David's functionality to connect with Github to, currently, save your public github information into MongoDb. We wanted to display that information on your profile page and allow you to edit those descriptions to add more personalization, but had to place that on our stretch goals given the time restraints.

These are only some of the highlights, I did most of the backend (database models, express routes, configuration for deployment) and state management infrastructure to allow my teammates to work on their strengths in the front end.

My absolute favorite part of this project was making a fresh pull to a new cool functionality that my teammates made, and being able to add more functionality onto their work to really just create something cool. I'm really interested in contributing to an open source project after this. 

## Example: 

Creating a post, starting from the backend you can view the basic express set up in `/server/index.js`. 

```
// 1. Create a Post model for the database. 
const Post = require("../models/Post");

// 2. Create an Express Route 
router.route("/add/").post(
  passport.authenticate("jwt", { failureRedirect: "/failed" }),
  (req, res) => {
    const text = req.body.text.trim();
    // return res.send("Test ok!")

    const newPost = new Post({
      user: {
        id: req.user.id,
        fullname: req.user.fullname
      },
      text
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err));
  }
);

// done with the backend! Use redux or hooks to call the API and update your frontend!
```

## 🔮 Future Development
* **More Login Methods** Google, Facebook, Twitter etc.
* **Direct Messaging** Right now, chat rooms are a non-sticky experience, while DM's will be persistant.
* **Sub-comments, Share, Report** To make things extra social.
* **Premium Tier** To access new features and buys us a cup of coffee for a couple dollars per month.
<p>&nbsp;</p>

## 📜 License
**MIT** • *(If you fork and recreate this, please be kind and rebrand your version!)*
<p>&nbsp;</p>

## 🏀 Contributors
* [David Metcalf](https://github.com/gloriousLoaf) 
* [Eric Gip](https://github.com/EricGip)
* [Maurice Chouamou](https://github.com/mauricechouam)
* [Chase Johnson](https://github.com/chaseyb)
* [Kimya Fallah](https://github.com/kimyaf)
<p>&nbsp;</p>

## 🔨 Tools - MERN Stack
* [React](https://reactjs.org/), [React-Redux](https://react-redux.js.org/) and [React-Bootstrap](https://react-bootstrap.github.io/)
* [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/) and [Node](https://nodejs.org/)
* [Socket.io](https://socket.io/) for our **chat rooms** and soon direct messaging.
* [Passport](http://www.passportjs.org/), [GitHub Oauth2](https://docs.github.com/en/developers/apps/authorizing-oauth-apps) and [bcryptjs](https://www.npmjs.com/package/bcryptjs) for authentication.
<p>&nbsp;</p>

## 📚 Resources
Some helpful information that helped our development process:
* [React Router](https://reacttraining.com/react-router/)
* [Proxying API Requests in Development](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development)
* [React Lifecycle Methods Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
* [Presentational vs. Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
<p>&nbsp;</p>

## ❔ Questions?
  * **Eric Gip**
  * **GitHub:** [EricGip](https://github.com/EricGip)
  * <Ejgip@ucdavis.edu>
  * Or hitup one of the contributors above!

<p>&nbsp;</p>
