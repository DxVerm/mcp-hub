import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("Utils Module", () => {
  describe("cn (className utility)", () => {
    it("should merge class names", () => {
      const result = cn("foo", "bar");
      expect(result).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
      const result = cn("foo", true && "bar", false && "baz");
      expect(result).toBe("foo bar");
    });

    it("should handle undefined and null", () => {
      const result = cn("foo", undefined, null, "bar");
      expect(result).toBe("foo bar");
    });

    it("should handle arrays", () => {
      const result = cn(["foo", "bar"]);
      expect(result).toBe("foo bar");
    });

    it("should handle objects", () => {
      const result = cn({ foo: true, bar: false, baz: true });
      expect(result).toBe("foo baz");
    });

    it("should merge Tailwind classes correctly", () => {
      // twMerge should resolve conflicts
      const result = cn("px-2 py-1", "px-4");
      expect(result).toBe("py-1 px-4");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("should handle mixed inputs", () => {
      const result = cn(
        "base",
        ["array-class"],
        { "object-class": true },
        true && "conditional"
      );
      expect(result).toBe("base array-class object-class conditional");
    });

    it("should handle Tailwind color class conflicts", () => {
      const result = cn("text-red-500", "text-blue-500");
      expect(result).toBe("text-blue-500");
    });

    it("should handle Tailwind size class conflicts", () => {
      const result = cn("w-4", "w-8");
      expect(result).toBe("w-8");
    });

    it("should preserve non-conflicting classes", () => {
      const result = cn("rounded-lg", "shadow-md", "hover:bg-gray-100");
      expect(result).toBe("rounded-lg shadow-md hover:bg-gray-100");
    });
  });
});
