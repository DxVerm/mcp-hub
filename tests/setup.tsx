import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => {
      const { initial, animate, exit, variants, whileHover, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <div {...rest}>{children}</div>;
    },
    section: ({ children, ...props }: React.PropsWithChildren<object>) => {
      const { initial, animate, exit, variants, whileHover, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <section {...rest}>{children}</section>;
    },
    span: ({ children, ...props }: React.PropsWithChildren<object>) => {
      const { initial, animate, exit, variants, whileHover, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <span {...rest}>{children}</span>;
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<object>) => children,
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
});
