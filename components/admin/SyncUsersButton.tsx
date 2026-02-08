"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface SyncUsersButtonProps {
  onSync: () => void;
}

export default function SyncUsersButton({ onSync }: SyncUsersButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sync-users", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to sync users");
      }

      const data = await response.json();
      alert(`Successfully synced ${data.synced} registered users!`);
      onSync();
    } catch (error: any) {
      console.error("Error syncing users:", error);
      alert("Error syncing users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSync}
      variant="outline"
      disabled={loading}
      className="flex items-center gap-2"
    >
      <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      {loading ? "Syncing..." : "Sync Registered Users"}
    </Button>
  );
}

