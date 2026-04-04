"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950">
        <p className="text-sm font-medium text-green-700 dark:text-green-400">
          ✅ LearnJap est déjà installée sur cet appareil !
        </p>
      </div>
    );
  }

  if (deferredPrompt) {
    return (
      <button
        onClick={handleInstall}
        className="w-full rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
      >
        Installer LearnJap
      </button>
    );
  }

  return (
    <div className="rounded-lg bg-zinc-50 p-4 text-center dark:bg-zinc-800">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        L&apos;installation rapide n&apos;est pas disponible sur ce navigateur.
        Suivez les instructions ci-dessous pour votre appareil.
      </p>
    </div>
  );
}
