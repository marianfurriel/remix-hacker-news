import { extractHost } from "../url";

describe("Url tests", () => {
  it("should extract host domain from url", () => {
    const input = 'https://github.com/facebook/react';
    const expected = 'github.com'
    const result = extractHost(input);

    expect(result).toEqual(expected);
  });

  it("should return empty value when url is not defined", () => {
    const input = '';
    const expected = ''
    const result = extractHost(input);

    expect(result).toEqual(expected);
  });
});
