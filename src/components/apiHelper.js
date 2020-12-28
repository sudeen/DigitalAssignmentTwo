{
  /* 
  In every Function async and await promises are used for getting data asynchronously.
  Asynchronous code is used because the program can continue to run and does not have to wait for the previous statement to finish
  */
}

// This function is used to get all the users from the API
export const getUsers = async () => {
  let users = [];
  const request = new Request("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  await fetch(request).then((res) => {
    users = res.json();
  });

  return users;
};

// This function is used to get all the posts of certain user using userId from the API
export const getPostsByUser = async (userId) => {
  let posts = [];
  if (!userId) return [];

  const request = new Request(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  await fetch(request).then((res) => {
    posts = res.json();
  });

  return posts;
};

// This function is used to get all the post using postId from the API
export const getPostById = async (postId) => {
  let post = [];
  if (!postId) return undefined;

  const request = new Request(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  await fetch(request).then((res) => {
    post = res.json();
  });

  return post;
};

// This function is used to get all the comments of specific post using postId from the given API
export const getCommentsByPostId = async (postId) => {
  let comments = [];
  if (!postId) return undefined;

  const request = new Request(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  await fetch(request).then((res) => {
    comments = res.json();
    // console.log("comments in api", comments);
  });

  return comments;
};
