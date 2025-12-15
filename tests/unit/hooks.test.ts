import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/use-local-storage";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((i: number) => Object.keys(store)[i] || null),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

describe("Hooks Module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  describe("useLocalStorage", () => {
    it("should return initial value when localStorage is empty", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial")
      );
      expect(result.current[0]).toBe("initial");
    });

    it("should read value from localStorage on mount", async () => {
      localStorageMock.setItem("test-key", JSON.stringify("stored-value"));

      const { result, rerender } = renderHook(() =>
        useLocalStorage("test-key", "initial")
      );

      // Wait for useEffect to run
      rerender();

      // The hook reads from localStorage in useEffect
      expect(localStorageMock.getItem).toHaveBeenCalledWith("test-key");
    });

    it("should update localStorage when setting value", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial")
      );

      act(() => {
        result.current[1]("new-value");
      });

      expect(result.current[0]).toBe("new-value");
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "test-key",
        JSON.stringify("new-value")
      );
    });

    it("should support function updater", () => {
      const { result } = renderHook(() => useLocalStorage("count", 0));

      act(() => {
        result.current[1]((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(1);
    });

    it("should remove value from localStorage", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial")
      );

      act(() => {
        result.current[1]("some-value");
      });

      act(() => {
        result.current[2](); // removeValue
      });

      expect(result.current[0]).toBe("initial");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("test-key");
    });

    it("should handle object values", () => {
      const initialObj = { name: "test", count: 0 };
      const { result } = renderHook(() =>
        useLocalStorage("test-obj", initialObj)
      );

      act(() => {
        result.current[1]({ name: "updated", count: 5 });
      });

      expect(result.current[0]).toEqual({ name: "updated", count: 5 });
    });

    it("should handle array values", () => {
      const { result } = renderHook(() =>
        useLocalStorage<string[]>("test-array", [])
      );

      act(() => {
        result.current[1](["a", "b", "c"]);
      });

      expect(result.current[0]).toEqual(["a", "b", "c"]);
    });

    it("should handle different keys independently", () => {
      const { result: result1 } = renderHook(() =>
        useLocalStorage("key1", "value1")
      );
      const { result: result2 } = renderHook(() =>
        useLocalStorage("key2", "value2")
      );

      expect(result1.current[0]).toBe("value1");
      expect(result2.current[0]).toBe("value2");

      act(() => {
        result1.current[1]("updated1");
      });

      expect(result1.current[0]).toBe("updated1");
      expect(result2.current[0]).toBe("value2");
    });
  });
});
