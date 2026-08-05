"use client";

import { useEffect, useRef, useState } from "react";

const EMBED_SRC = "https://player.twitch.tv/js/embed/v1.js";

declare global {
  interface Window {
    Twitch?: {
      Player: {
        new (id: string, options: Record<string, unknown>): TwitchPlayerApi;
        READY: string;
        ONLINE: string;
        OFFLINE: string;
      };
    };
  }
}

interface TwitchPlayerApi {
  addEventListener(event: string, handler: () => void): void;
  removeEventListener(event: string, handler: () => void): void;
  setMuted(muted: boolean): void;
}

function loadEmbedScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Twitch?.Player) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }

    const script = document.createElement("script");
    script.src = EMBED_SRC;
    script.async = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject());
    document.body.appendChild(script);
  });
}

export default function TwitchPlayer({ channel }: { channel: string }) {
  const [online, setOnline] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let player: TwitchPlayerApi | undefined;

    function handleOnline() {
      setOnline(true);
      player?.setMuted(false);
    }

    function handleOffline() {
      setOnline(false);
      player?.setMuted(true);
    }

    loadEmbedScript()
      .then(() => {
        const Twitch = window.Twitch;
        // The container is cleared on unmount, so re-entry rebuilds the player.
        if (cancelled || !Twitch || !containerRef.current) return;

        player = new Twitch.Player("twitch", {
          channel,
          width: 640,
          height: 360,
          parent: [window.location.hostname],
        });

        player.addEventListener(Twitch.Player.READY, () => {
          player?.addEventListener(Twitch.Player.ONLINE, handleOnline);
          player?.addEventListener(Twitch.Player.OFFLINE, handleOffline);
        });
      })
      .catch(() => {
        // Embed unavailable — leave the player hidden rather than showing a gap.
      });

    return () => {
      cancelled = true;
      const Twitch = window.Twitch;
      if (player && Twitch) {
        player.removeEventListener(Twitch.Player.ONLINE, handleOnline);
        player.removeEventListener(Twitch.Player.OFFLINE, handleOffline);
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [channel]);

  return <div ref={containerRef} id="twitch" className={online ? "" : "hide"} />;
}
