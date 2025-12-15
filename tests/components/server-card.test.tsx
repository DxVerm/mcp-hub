import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServerCard } from "@/components/servers/server-card";
import type { MCPServer } from "@/types";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock SaveButton to simplify test
vi.mock("@/components/servers/save-button", () => ({
  SaveButton: ({ serverId }: { serverId: string }) => (
    <button data-testid={`save-btn-${serverId}`}>Save</button>
  ),
}));

// Mock category lookup
vi.mock("@/lib/data", () => ({
  getCategoryById: () => ({ id: "development", name: "Development" }),
}));

const mockServer: MCPServer = {
  id: "test-server",
  slug: "test-server",
  name: "Test Server",
  description: "A test MCP server for unit testing",
  type: "stdio",
  command: "test-command",
  args: ["--test"],
  category: "development",
  tags: ["test", "unit-testing"],
  source: "community",
  verified: true,
  repository: "https://github.com/test/test-server",
  install: {
    npm: "npm install test-server",
    npx: "npx test-server",
  },
  claudeConfig: {
    command: "test-command",
    args: ["--test"],
  },
  stats: {
    stars: 100,
    downloads: 5000,
  },
  featured: true,
};

describe("ServerCard Component", () => {
  it("should render server name", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("Test Server")).toBeInTheDocument();
  });

  it("should render server description", () => {
    render(<ServerCard server={mockServer} />);
    expect(
      screen.getByText("A test MCP server for unit testing")
    ).toBeInTheDocument();
  });

  it("should render server type badge", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("stdio")).toBeInTheDocument();
  });

  it("should render tags (up to 2)", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("unit-testing")).toBeInTheDocument();
  });

  it("should render star count when available", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("should render download count when available", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("5,000")).toBeInTheDocument();
  });

  it("should link to server detail page", () => {
    render(<ServerCard server={mockServer} />);
    const links = screen.getAllByRole("link");
    const detailLink = links.find((link) =>
      link.getAttribute("href")?.includes("/servers/test-server")
    );
    expect(detailLink).toBeDefined();
  });

  it("should render save button", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByTestId("save-btn-test-server")).toBeInTheDocument();
  });

  it("should render source badge", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("community")).toBeInTheDocument();
  });

  it("should render featured badge when featured", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("should not render featured badge when not featured", () => {
    const notFeaturedServer = { ...mockServer, featured: false };
    render(<ServerCard server={notFeaturedServer} />);
    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });

  it("should handle server without stats", () => {
    const serverNoStats = { ...mockServer, stats: undefined };
    render(<ServerCard server={serverNoStats} />);
    expect(screen.getByText("Test Server")).toBeInTheDocument();
    // Should not render stat counts when stats are missing
    expect(screen.queryByText("100")).not.toBeInTheDocument();
  });

  it("should hide save button when showSaveButton is false", () => {
    render(<ServerCard server={mockServer} showSaveButton={false} />);
    expect(
      screen.queryByTestId("save-btn-test-server")
    ).not.toBeInTheDocument();
  });

  it("should show +N badge when more than 2 tags", () => {
    const serverManyTags = {
      ...mockServer,
      tags: ["tag1", "tag2", "tag3", "tag4"],
    };
    render(<ServerCard server={serverManyTags} />);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("should render View button", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("View")).toBeInTheDocument();
  });

  it("should render category name", () => {
    render(<ServerCard server={mockServer} />);
    expect(screen.getByText("Development")).toBeInTheDocument();
  });
});
