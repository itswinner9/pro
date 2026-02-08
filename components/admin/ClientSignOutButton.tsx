"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export default function ClientSignOutButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start text-blue-200 hover:text-white hover:bg-blue-800/50 mt-2"
        disabled
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    );
  }

  return (
    <SignOutButton>
      <Button
        variant="ghost"
        className="w-full justify-start text-blue-200 hover:text-white hover:bg-blue-800/50 mt-2"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </SignOutButton>
  );
}

