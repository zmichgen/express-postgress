const Post = (post) => {
     if(post) Object.assign(this, post);
}

/**
 *  owner: string - user id;
 *  message: string;
 *  media: array of routes; ???
 *  date: string;
 *  id: GUID;
 */

module.exports = Post;