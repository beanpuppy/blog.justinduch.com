import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

import showdown from 'showdown';
import readingTime from 'reading-time';

import { footnotes, prettify, highlight, peertube, youtube } from '$lib/showdown';

const converter = new showdown.Converter({
  tables: true,
  strikethrough: true,
  extensions: [footnotes, highlight, peertube, youtube, prettify]
});

const postsDir = '_posts';

function replaceHtml(slug, html) {
  // replace reference tags will full path because I don't know how to change
  // the base url.
  return html
    .replace(/#reference/g, `post/${slug}/#reference`)
    .replace(/#footnote/g, `post/${slug}/#footnote`);
}

function getPostData(data, getHtml) {
  // Because there is no metadata extension, we need to read the lines
  let lines = data.split('\n');
  let metadataString = lines.slice(1, 4);
  let body = lines.slice(4, lines.length).join('\n');

  return {
    title: metadataString[0].split(':').slice(1).join(':').trim(),
    thumbnail: metadataString[1].split(':')[1].trim(),
    readtime: Math.ceil(readingTime(body).minutes),
    html: getHtml ? converter.makeHtml(body) : null
  };
}

function parseFilename(file) {
  let f = file.split('.')[0].split('-');
  let [date, slug] = [f.splice(0, 3).join('-'), f.splice(0, 1)[0]];

  if (slug == '[cid]') {
    let file_buffer = fs.readFileSync(path.join(postsDir, file));
    let sum = crypto.createHash('sha256');
    sum.update(file_buffer);
    slug = sum.digest('hex');
  }

  return [date, slug];
}

function getPost(snail) {
  let post = null;

  fs.readdirSync(postsDir).forEach((file) => {
    let filepath = path.join(postsDir, file);
    let [date, slug] = parseFilename(file);

    if (snail === slug) {
      let data = fs.readFileSync(filepath, { encoding: 'utf-8' });
      post = { ...getPostData(data, true), slug, date };
      post.html = replaceHtml(slug, post.html);
    }
  });

  return post;
}

function getPosts(getHtml = true) {
  let posts = [];

  fs.readdirSync(postsDir).forEach((file) => {
    let filepath = path.join(postsDir, file);
    let [date, slug] = parseFilename(file);

    let data = fs.readFileSync(filepath, { encoding: 'utf-8' });
    let post = { ...getPostData(data, getHtml), slug, date };

    posts.push(post);
  });

  return posts;
}

export { getPosts, getPost };
