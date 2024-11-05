import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    // electron: ElectronAPI
    // context: {
    // }
    electronAPI: {
      myFunction: (message: string) => void
      getVideoSources: () => any
    }
  }
}
