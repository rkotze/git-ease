/**
 * @jest-environment jsdom
*/
import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import CommitMeta from "./Commit-meta.svelte";
jest.mock("dateformat", () => ({ default: jest.fn() }));


test("Show only hash unlinked when no Git origin", () => {
  const hash = "se242su";
  const {getByText} = render(CommitMeta, {
    date: new Date(),
    hash,
    origin: null 
  });

  expect(getByText(hash).closest("a")).toBeNull();
});

test("Show linked hash when no Git origin", () => {
  const hash = "se242su";
  const originUrl = "https://github.com/rkotze";
  const {getByText} = render(CommitMeta, {
    date: new Date(),
    hash,
    origin: {
      url:  originUrl
    } 
  });

  expect(getByText(hash).closest("a")).toHaveAttribute('href', `${originUrl}/commit/${hash}`);
});