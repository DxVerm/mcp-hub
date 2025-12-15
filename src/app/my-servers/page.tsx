"use client";

import * as React from "react";
import Link from "next/link";
import {
  Heart,
  Plus,
  Download,
  Upload,
  Trash2,
  Server,
  Settings,
  FileJson,
  AlertCircle,
} from "lucide-react";

import { useSavedServers, useCustomServers } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ServerGrid } from "@/components/servers/server-grid";
import { toast } from "@/hooks/use-toast";

export default function MyServersPage() {
  const {
    savedServers,
    unsaveServer,
    clearAllSaved,
    savedCount,
  } = useSavedServers();

  const {
    customServers,
    deleteCustomServer,
    clearAllCustomServers,
    exportCustomServers,
    importCustomServers,
    customCount,
  } = useCustomServers();

  const [importDialogOpen, setImportDialogOpen] = React.useState(false);
  const [importJson, setImportJson] = React.useState("");
  const [importError, setImportError] = React.useState<string | null>(null);

  const handleExport = () => {
    const json = exportCustomServers();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mcp-hub-custom-servers.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported successfully",
      description: `${customCount} custom server(s) exported to file.`,
    });
  };

  const handleImport = () => {
    setImportError(null);
    const result = importCustomServers(importJson, false);

    if (result.success) {
      toast({
        title: "Imported successfully",
        description: `${result.count} server(s) imported.`,
      });
      setImportDialogOpen(false);
      setImportJson("");
    } else {
      setImportError(result.error || "Import failed");
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setImportJson(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Servers</h1>
        <p className="text-muted-foreground">
          Manage your saved and custom MCP servers. Your data is stored locally
          in your browser.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="saved" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="saved" className="gap-2">
              <Heart className="h-4 w-4" />
              Saved
              {savedCount > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                  {savedCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="custom" className="gap-2">
              <Settings className="h-4 w-4" />
              Custom
              {customCount > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                  {customCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Actions for Custom tab */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/submit">
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Server
              </Link>
            </Button>
          </div>
        </div>

        {/* Saved Servers Tab */}
        <TabsContent value="saved" className="space-y-6">
          {savedCount > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {savedCount} saved server{savedCount !== 1 ? "s" : ""}
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear all saved servers?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all {savedCount} servers from your saved list.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={clearAllSaved}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <ServerGrid
                servers={savedServers}
                showSaveButton
                onUnsave={unsaveServer}
              />
            </>
          ) : (
            <EmptyState
              icon={Heart}
              title="No saved servers yet"
              description="Browse servers and click the heart icon to save them here for quick access."
              action={
                <Button asChild>
                  <Link href="/categories">Browse Servers</Link>
                </Button>
              }
            />
          )}
        </TabsContent>

        {/* Custom Servers Tab */}
        <TabsContent value="custom" className="space-y-6">
          {customCount > 0 ? (
            <>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-muted-foreground">
                  {customCount} custom server{customCount !== 1 ? "s" : ""}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>

                  <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Import Custom Servers</DialogTitle>
                        <DialogDescription>
                          Import servers from a JSON file or paste JSON directly.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="file-import">Upload JSON file</Label>
                          <input
                            id="file-import"
                            type="file"
                            accept=".json"
                            onChange={handleFileImport}
                            className="mt-2 block w-full text-sm text-muted-foreground
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:text-sm file:font-medium
                              file:bg-primary file:text-primary-foreground
                              hover:file:bg-primary/90
                              cursor-pointer"
                          />
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                              Or paste JSON
                            </span>
                          </div>
                        </div>
                        <Textarea
                          value={importJson}
                          onChange={(e) => setImportJson(e.target.value)}
                          placeholder='[{"name": "My Server", "type": "stdio", ...}]'
                          rows={8}
                          className="font-mono text-sm"
                        />
                        {importError && (
                          <div className="flex items-center gap-2 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            {importError}
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setImportDialogOpen(false);
                            setImportJson("");
                            setImportError(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleImport} disabled={!importJson.trim()}>
                          <FileJson className="h-4 w-4 mr-2" />
                          Import
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete all custom servers?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all {customCount} custom servers.
                          This action cannot be undone. Consider exporting first.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={clearAllCustomServers}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete All
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {customServers.map((server) => (
                  <CustomServerCard
                    key={server.id}
                    server={server}
                    onDelete={() => deleteCustomServer(server.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={Settings}
              title="No custom servers yet"
              description="Add your own MCP server configurations to keep them organized and easily accessible."
              action={
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Server
                    </Link>
                  </Button>
                  <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Import Custom Servers</DialogTitle>
                        <DialogDescription>
                          Import servers from a JSON file or paste JSON directly.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="file-import-empty">Upload JSON file</Label>
                          <input
                            id="file-import-empty"
                            type="file"
                            accept=".json"
                            onChange={handleFileImport}
                            className="mt-2 block w-full text-sm text-muted-foreground
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:text-sm file:font-medium
                              file:bg-primary file:text-primary-foreground
                              hover:file:bg-primary/90
                              cursor-pointer"
                          />
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                              Or paste JSON
                            </span>
                          </div>
                        </div>
                        <Textarea
                          value={importJson}
                          onChange={(e) => setImportJson(e.target.value)}
                          placeholder='[{"name": "My Server", "type": "stdio", ...}]'
                          rows={8}
                          className="font-mono text-sm"
                        />
                        {importError && (
                          <div className="flex items-center gap-2 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            {importError}
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setImportDialogOpen(false);
                            setImportJson("");
                            setImportError(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleImport} disabled={!importJson.trim()}>
                          <FileJson className="h-4 w-4 mr-2" />
                          Import
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              }
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}

function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}

// Custom Server Card Component
interface CustomServerCardProps {
  server: {
    id: string;
    name: string;
    description: string;
    type: string;
    category: string;
    createdAt: string;
  };
  onDelete: () => void;
}

function CustomServerCard({ server, onDelete }: CustomServerCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-2">
              <Server className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{server.name}</CardTitle>
              <CardDescription className="text-xs">
                {server.type} · {server.category}
              </CardDescription>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete &ldquo;{server.name}&rdquo;?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this custom server configuration.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {server.description}
        </p>
        <p className="text-xs text-muted-foreground mt-3">
          Created {new Date(server.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
