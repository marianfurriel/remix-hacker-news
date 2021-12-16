
import { client } from "~/utils/httpClient";

import Api from './index';

jest.mock("~/utils/httpClient", () => ({
  client: {
    get: jest.fn(),
  },
}));

describe('Api tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should call getItem', () => {
    const input = 12121;
    const expected = 'https://hn.algolia.com/api/v1/items/12121';
    
    Api.getItem(input);

    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith(expected);
  });

  it('should call getTopStories', () => {
    const expected = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    
    Api.getTopStories();

    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith(expected);
  });

  it('should call getJobStories', () => {
    const expected = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
    
    Api.getJobStories();

    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith(expected);
  });

  it('should call getAskStories', () => {
    const expected = 'https://hacker-news.firebaseio.com/v0/askstories.json';
    
    Api.getAskStories();

    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith(expected);
  });

  it('should call getShowStories', () => {
    const expected = 'https://hacker-news.firebaseio.com/v0/showstories.json';
    
    Api.getShowStories();

    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith(expected);
  });
});
