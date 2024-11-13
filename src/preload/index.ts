import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Preload must be run in a context that is isolated')
}

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    myFunction: (message: string) => ipcRenderer.send('hii', message),
    getVideoSources: () => ipcRenderer.invoke('getVideoSources'),
    saveRecording: (recordedChunks: any) => ipcRenderer.invoke('saveRecording', recordedChunks)
  })
} catch (e) {
  console.log("error in preload")
  console.error(e)
}
