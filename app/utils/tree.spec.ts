import { count } from "./tree";

describe("Tree tests", () => {
  it("should count tree list", () => {
    const input = [
      {
        id: 1,
        children: [
          { id: 4, children: [] },
          {
            id: 5,
            children: [
              { id: 6, children: [] },
              { id: 7, children: [{ id: 8, children: [] }] },
            ],
          },
        ],
      },
      { id: 2, children: [] },
      {
        id: 3,
        children: [
          { id: 9, children: [] },
          { id: 10, children: [] },
        ],
      },
    ];
    const expected = 10;
    const result = count(input, 'children');

    expect(result).toEqual(expected);
  });

  it("should return zero for empty tree", () => {
    const input: any[] = [];
    const expected = 0;
    const result = count(input, 'children');

    expect(result).toEqual(expected);
  });
});
