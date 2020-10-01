///// MAIN PROFILE /////
import React, { Component } from "react";
import { connect } from "react-redux";
// connect this with export default at bottom
import {
  getPostsByUserId,
  getUserProfile,
  unfollowUser,
  followUser,
  refreshUserProfile,
  logoutUser
} from "../../actions/profileActions/profileActions";

import { deletePosts } from "../../actions/postActions/postActions";

import gitAPI from '../../utils/GithubAPIS';

import Banner from '../Banner';
import NavBar from "../NavBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Post from "../posts/Post";
import LoadingPosts from "../posts/LoadingPosts";
import SocialCard from "./SocialCard";
import UserAction from "./UserAction";

import './style.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getPostsByUserId(this.props.match.params.userId);
    this.props.getUserProfile(this.props.match.params.userId);
  }

  // do this for signup and login if you can.
  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      // if we changed the following prop,
      if (
        prevProps.user &&
        prevProps.user.following !== this.props.user.following
      ) {
        // refresh the page
        this.props.refreshUserProfile(this.props.match.params.userId);
      }
    }
  }

  handleFollow() {
    this.props.followUser(this.props.match.params.userId);
  }

  handleUnfollow() {
    this.props.unfollowUser(this.props.match.params.userId);
  }

  handleDelete(id) {
    this.props.deletePosts(id);
  }

  render() {
    const {

      loadingPosts,
      loadingProfile,
      list,
      auth,
      user,
      profile
    } = this.props;

    const items =
      list &&
      list.map(el => (
        <div>
          <Post key={el._id} post={el} />
        </div>
      ));

    let profileInfo;

    let followButtons;

    // if if authenticated,
    if (auth.isAuthenticated) {
      // if user exist, user has a following array
      if (
        user &&
        user.following &&
        // if you aren't following this person, show follow, else show unfollow
        user.following.indexOf(this.props.match.params.userId) === -1
      ) {
        followButtons = (
          ///////// CSS? /////////
          <div>
            <Button className="following" onClick={this.handleFollow}>Follow</Button>
          </div>
        );
      } else {
        followButtons = (
          ///////// CSS? /////////
          <div>
            <Button className="following" onClick={this.handleUnfollow}>Unfollow</Button>
          </div>
        );
      }
    }

    ///////// GitHub Button Logic /////////
    /* Notes: Conditional currently works for a first time
    // auth connection. Pulls authUser{} from localstorage,
    // uses that to show connector on user's page but not other
    // profiles. GH Connector adds user{} to localstorage with
    // a lot more GH data we can display when we have time. It also
    // hits the db. Querying db will be essential to make this
    // a one-time auth, i.e. connect once and always see your data */
    //////////// Here we go: /////////////

    // GH button, rendered conditionally
    let githubConnector;
    // GH info from db, if it already exists
    let ghUser;
    // new GH auth returns obj "user" to db & localstorage
    let newGhUser = JSON.parse(localStorage.getItem("user"));
    // auth'd user id from storage to query db & compare url
    let myUser = JSON.parse(localStorage.getItem("authUser"));
    // query db to see if user has already auth'd GH
    gitAPI.getGitInfo(myUser._id)
      .then(res => {
        if (res === "error") {
          throw new Error(res);
        } else if (res.data) {
          // can't directly set value of ghUser to res.data
          localStorage.setItem("ghUser", JSON.stringify(res.data));
        } else {
          // and if no res.data, set ghUser as simple obj to compare
          localStorage.setItem("ghUser", JSON.stringify({ data: "none yet" }));
        }
      })
      .catch(res => console.log(res));

    //////////// HERE - this needs to not be parsed before auth, but parsed after...
    ghUser = JSON.parse(localStorage.getItem("ghUser"));
    // ghUser = localStorage.getItem("ghUser");
    console.log(ghUser);
    // }, 200)

    // FINALLY, ghData will either be ghUser if api returns data,
    // or newGhUser if the user makes a new GH auth connection.
    // Used below to populate button or not, and display info.
    let ghData;
    if (ghUser === { data: "none yet" }) {
      // undefined until user auth's GH
      ghData = newGhUser;
      console.log("new", ghData);
    } else {
      // previous GH auth existed
      ghData = ghUser;
      console.log("old", ghData);
    }

    this.props.location.pathname === `/Profile/${myUser._id}` && ghData.data ? (
      // if user matches url, render GitHub connector
      githubConnector = (
        <>
          <div>
            <Button href="/githublogin" type="button" className="githubBtn">
              <i className="fab fa-github-square m-2" aria-hidden="true" title="Github"></i>
              Connect GitHub
            </Button>
          </div>
          <em style={{ marginBottom: "1.5rem" }}>Link your account to add avatar and share stats!</em>
        </>
      )
    ) : (
        // if not a match, it most be someone else, so don't display
        githubConnector = (
          <></>
        )
      );
    /////////////////

    if (profile && items) {
      profileInfo = (
        <Card className="card container my-4 py-5 text-center" id="border">
          <h1> {profile.fullname} </h1>
          <div>
            {/* if GH connected, display GH avatar
                this will work right when pulling from db */}
            {!ghData.avatarUrl ? (
              <></>
            ) : (
                <img className="avatar" src={ghData.avatarUrl} alt="Avatar" />
              )
            }
          </div>

          <ul className="profStats list-unstyled mt-3">
            <li>
              <h5> {profile.email} </h5>
              <h5>Snipshot:</h5>
            </li>

            <li className="pb-1"> {items.length} posts </li>

            <li className="py-1"> {profile.followers.length} followers </li>

            <li className="py-1"> {profile.following.length} following </li>
          </ul>

          {/* GitHub Connector Button */}
          { githubConnector}

          <div>
            <ul className="profStats list-unstyled mt-2">
              <li>
                <h5>GitHub Stats:</h5>
              </li>
              {!ghData.publicRepos ? (
                <li>Click the Octocat button below to check out my profile!</li>
              ) : (
                  <>
                    <li className="pb-1">{ghData.publicRepos} Repos</li>
                    <li className="py-1">{ghData.followers} Followers</li>
                    <li className="py-1">{ghData.following} Following</li>
                    <li className="pb-1"><a style={{ color: 'blue' }} href={ghData.htmlUrl}>View Profile</a></li>
                  </>
                )}
            </ul>
          </div>

          { followButtons}

        </Card >
      );
    }

    return (
      ///////// CSS /////////
      // these two containers give a ratio like old profile page
      // changes to cardContainer specifically will cascasde to ListPost.js
      <div className="profContainer">
        <div className="cardContainer">
          <Banner />
          {loadingProfile ? <div>Loading</div> : profileInfo}

          {/* put any additional sections here, above LoadingPosts */}
          {/* see respective cards for #DeleteMe */}
          <SocialCard />
          <UserAction />
          {loadingPosts ? <LoadingPosts /> : items}
        </div>


        <NavBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loadingPosts: state.post.loading,
  list: state.post.list,
  profile: state.profile.user,
  loadingProfile: state.profile.loading,
  auth: state.auth,
  user: state.auth.user
});

//everything from actions
export default connect(mapStateToProps, {
  getPostsByUserId,
  getUserProfile,
  unfollowUser,
  followUser,
  refreshUserProfile,
  deletePosts,
  logoutUser
})(Profile);
