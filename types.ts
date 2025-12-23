
export interface DecorationResult {
  id: string;
  originalImage: string;
  decoratedImage: string;
  prompt: string;
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  ERROR = 'error',
  SUCCESS = 'success'
}
