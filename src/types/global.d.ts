/// <reference types="vite/client" />

interface DownloadProgressEvent extends Event {
  loaded: number;
  total: number;
}

interface AIMonitor {
  addEventListener(type: 'downloadprogress', listener: (event: DownloadProgressEvent) => void): void;
}

interface AISummarizer {
  create(options: {
    monitor: (monitor: AIMonitor) => void;
  }): {
    summarize: (text: string) => Promise<string>;
  };
}

interface AI {
  summarizer: AISummarizer;
}

declare global {
  interface Window {
    ai: AI;
  }
}
