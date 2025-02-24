import { contextBridge, ipcRenderer, } from 'electron';

// contextBridge.exposeInMainWorld('electronAPI', {
//   toggleDark: (dark: boolean) => ipcRenderer.invoke('darkMode:toggle', dark),
// })


contextBridge.exposeInMainWorld('fileHandler', {
  write: (file:string, data:string) => {
    ipcRenderer.invoke('file:write', { file, data })
  },
  read: async (file:string) => {
    const data = await ipcRenderer.invoke('file:read', file);
    return data;
  }
})

