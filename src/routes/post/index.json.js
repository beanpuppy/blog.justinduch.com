import { getPosts } from './_posts.js';

export const get = async (_) => {
  let posts = getPosts(false).sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  const data = JSON.stringify(
    posts.map((post) => {
      return {
        title: post.title,
        slug: post.slug,
        date: post.date,
        thumbnail: post.thumbnail,
        category: post.category,
        readtime: post.readtime
      };
    })
  );

  return {
    body: data
  };
};
