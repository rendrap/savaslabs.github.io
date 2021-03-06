import axios from 'axios';

// Jekyll variable; see config files.
const commentServer = '{{ site.comment_server_url }}';

// Create URI for fetching comments.
const postSlug = window.location.pathname;
const truncatedSlug = postSlug.substring(1, postSlug.length);
const encodedSlug = encodeURIComponent(truncatedSlug);
const requestUri = commentServer + '/api/comments/post?slug=' + encodedSlug;

// Create URI for posting comment.
const postUri = commentServer + '/api/comments/new';

module.exports = {
  getComments: function () {
    'use strict';
    return axios.get(requestUri)
      .then(function (response) {
        return response.data;
      })
      .catch(function () {
        return null;
      });
  },
  postComment: function (commentData) {
    'use strict';
    return axios({
      method: 'post',
      url: postUri,
      data: commentData
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  }
};
