// @ts-nocheck
import { client } from './httpClient';

describe('HttpClient tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should parse data when get call is ok', async () => {
    global.fetch.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ value: 10 }),
    }));

    const input = 'https://url.com/item/1';
    const expected = { value: 10 };  
    const result = await client.get(input);

    expect(global.fetch).toHaveBeenCalledWith('https://url.com/item/1');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);    
  });

  it('should throw an error when get call has an error', async () => {
    global.fetch.mockImplementation(() => Promise.reject('Id cannot be undefined.'));
   
    const input = 'https://url.com/item';
    
    await client.get(input).catch(err => {
      expect(global.fetch).toHaveBeenCalledWith('https://url.com/item');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(err).toEqual('Id cannot be undefined.');
    });
  });
});
