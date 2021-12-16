
import { useLocation, useNavigate } from "remix";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Pager from "../Pager";

jest.mock("remix", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

const mockUseNavigate = useNavigate as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

describe("Pager tests", () => {
  const navigateSpy = jest.fn();
  mockUseNavigate.mockImplementation(() => navigateSpy);
  mockUseLocation.mockImplementation(() => ({
    hash: "",
    key: "h52ht2g8",
    pathname: "/news",
    search: "?p=2",
    state: null,
  }));

  beforeEach(() => {
    render(<Pager route="news" />);
  })

  it("should render page number", async () => {
    const pageNumber = await screen.findByText('page 2');

    expect(pageNumber).toBeVisible();
  });

  it("should render previous button", async () => {
    const prevBtn = await screen.findByText(/prev/i);
  
    expect(prevBtn).toBeVisible();
  });

  it('should navigate to the next page when clicking next', async () => {
    const nextBtn = await screen.findByText(/next/i);
    fireEvent.click(nextBtn);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenLastCalledWith('/news?p=3');
  });
});
