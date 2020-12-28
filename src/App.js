// Material UI Framework is used to Style this page
// React Hooks are used to manipulate the state of functional component

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  getUsers,
  getPostsByUser,
  getPostById,
  getCommentsByPostId,
} from "./components/apiHelper";

// Material UI Styling
const useStyles = makeStyles({
  mainContainer: {
    marginTop: "5em",
    width: "100%",
  },
  userNameButtons: {
    position: "relative",
    margin: 0,
    fontSize: 20,
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  loadAllPostsButton: {
    margin: 0,
    fontSize: 14,
  },
  postTitleList: {
    fontSize: 20,
    cursor: "default",
    "&:hover": {
      backgroundColor: "skyblue",
    },
  },
  comments: {
    fontSize: 20,
  },
  singlePostDetail: {
    fontSize: 20,
  },
  circularProgress: {
    position: "relative",
    marginLeft: "50%",
  },
});

const App = () => {
  const classes = useStyles();
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [postLimit, setPostLimit] = useState(3);
  const [showAllPostsButton, setShowAllPostsButton] = useState(false);
  const [showPostTitle, setShowPostTitle] = useState(false);
  const [expandCommentButton, setExpandCommentButton] = useState(false);

  const [showCommentTitle, setShowCommentTitle] = useState(false);
  const [postDetailTitle, setPostDetailTitle] = useState(false);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  const loadUsers = async () => {
    const userList = await getUsers();
    setUsers(userList);
    setLoadingUsers(false);
  };

  // Split function is used to get the first name only
  const getFirstName = (name) => {
    return name.split(" ")[0];
  };

  // Getting All the Users
  const handleUserClick = async (id) => {
    setLoadingPosts(true);
    setPost([]);
    setComments([]);
    setShowAllPostsButton(false);
    const postList = await getPostsByUser(id);
    setPosts(postList);
    setShowPostTitle(true);
    setShowAllPostsButton(true);
    setLoadingPosts(false);
  };

  // Getting all the Posts
  const handlePostClick = async (id) => {
    setLoadingPost(true);
    setPost([]);
    setComments([]);
    setShowAllPostsButton(false);
    const postDetail = await getPostById(id);
    setPostDetailTitle(true);
    setPost(postDetail);
    setExpandCommentButton(true);
    setLoadingPost(false);
  };

  // Getting all the Comments
  const handleCommentClick = async (id) => {
    setLoadingComments(true);
    const commentsList = await getCommentsByPostId(id);
    console.log("comment list", commentsList);
    setComments(commentsList);
    setShowCommentTitle(true);
    setExpandCommentButton(true);
    setLoadingComments(false);
  };

  // Function to Load all Posts using the load all button
  const loadAll = () => {
    if (posts.length === 0 || posts === undefined) {
      setPostLimit(3);
      setShowCommentTitle(true);
      return;
    }
    setPostLimit(posts.length);
    setShowAllPostsButton(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Grid container direction="column" className={classes.mainContainer}>
      {/* Loading Indicator to indicate data is being fetched from API */}
      {loadingUsers ? (
        <CircularProgress
          disableShrink
          value={100}
          className={classes.circularProgress}
        />
      ) : (
        // Listing all Users First name in Button format
        <Grid container direction="row" justify="center">
          {users.map((u) => (
            <Button
              className={classes.userNameButtons}
              key={u.id}
              onClick={() => handleUserClick(u.id)}
            >
              {getFirstName(u.name)}
            </Button>
          ))}

          <br />
          <br />
          <br />

          <Grid
            container
            justify="flex-start"
            alignItems="center"
            direction="row"
          >
            <Grid
              container
              direction="row"
              spacing={4}
              justify="space-evenly"
              className={classes.postSection}
            >
              {/* List 3 Specific posts from the API */}
              <Grid item xs={6}>
                {loadingPosts ? (
                  // Circular Progress icon to indicate data being loaded
                  <CircularProgress className={classes.circularProgress} />
                ) : (
                  <div>
                    <div>
                      {showPostTitle ? (
                        <Typography variant="h4">POSTS</Typography>
                      ) : null}
                    </div>
                    <br />
                    {/* slice function is used to get only 3 post from the list */}
                    {posts.slice(0, postLimit).map((p) => (
                      <div
                        className={classes.postTitleList}
                        key={p.id}
                        onClick={() => handlePostClick(p.id)}
                      >
                        {p.title}

                        <hr />
                      </div>
                    ))}
                    {showAllPostsButton ? (
                      <Button
                        className={classes.loadAllPostsButton}
                        color="primary"
                        onClick={loadAll}
                      >
                        Load All Posts
                      </Button>
                    ) : null}
                  </div>
                )}
              </Grid>
              <Grid className={classes.postContent} item xs={4}>
                {/* Loading Specific Post Detail */}
                {post &&
                  (loadingPost ? (
                    <CircularProgress
                      className={classes.circularProgress}
                      disableShrink
                    />
                  ) : (
                    <div>
                      {postDetailTitle ? (
                        <Typography variant="h4">POST DETAIL</Typography>
                      ) : null}
                      <br />
                      <Grid className={classes.singlePostDetail}>
                        {post.title}
                        <hr />
                        {post.body}
                        <br />
                      </Grid>
                      {expandCommentButton ? (
                        <Button
                          onClick={() => handleCommentClick(post.id)}
                          color="primary"
                        >
                          Load Comments
                        </Button>
                      ) : null}
                      <br />
                      <hr />
                      <Grid className={classes.comments}>
                        <div>
                          {showCommentTitle ? (
                            <Typography variant="h5">COMMENTS</Typography>
                          ) : null}
                        </div>
                        {loadingComments
                          ? "Loading Comments.."
                          : comments.map((c) => (
                              <div className={classes.comments} key={c.id}>
                                {c.body} <hr />
                              </div>
                            ))}
                      </Grid>
                    </div>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default App;
