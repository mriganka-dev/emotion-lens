import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

expect.extend(matchers);

// Stub browser APIs for jsdom environment
if (typeof window !== "undefined") {
  if (typeof window.URL.createObjectURL === "undefined") {
    window.URL.createObjectURL = () => "blob:mock-url";
  }
  if (typeof window.URL.revokeObjectURL === "undefined") {
    window.URL.revokeObjectURL = () => {};
  }
}
