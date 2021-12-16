import { formatDate } from "./date";

describe("Date formatting tests", () => {
  it("should format timestamp date", () => {
    const date = new Date();
    date.setHours(date.getHours() - 2);
    const input = Math.round(date.getTime() / 1000);
    const expected = "about 2 hours ago";
    const result = formatDate(input);

    expect(result).toEqual(expected);
  });
});
