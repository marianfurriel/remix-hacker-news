import { client } from "~/utils/httpClient";

function getItem(itemId: number) {
  return client.get(
    `https://hn.algolia.com/api/v1/items/${itemId}`
  );
}

function getTopStories() {
  return client.get(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
}

function getJobStories() {
  return client.get(
    "https://hacker-news.firebaseio.com/v0/jobstories.json"
  );
}

function getAskStories() {
  return client.get(
    "https://hacker-news.firebaseio.com/v0/askstories.json"
  );
}

function getShowStories() {
  return client.get(
    "https://hacker-news.firebaseio.com/v0/showstories.json"
  );
}

export default {
  getItem,
  getTopStories,
  getJobStories,
  getAskStories,
  getShowStories,
};
