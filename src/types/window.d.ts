interface DownloadProgressEvent extends Event {
  loaded: number;
  total: number;
}

interface AIMonitor extends EventTarget {
  addEventListener(
    type: 'downloadprogress',
    listener: (event: DownloadProgressEvent) => void
  ): void;
}

interface AISummarizer {
  create(options: {
    monitor: (monitor: AIMonitor) => void;
  }): {
    summarize: (text: string, options?: any) => Promise<string>;
  };
  capabilities(): { available: string; hasModel: boolean; loading: boolean };
}

interface AI {
  summarizer: AISummarizer;
}

declare global {
  interface Window {
    ai: AI;
  }
}

export {};
