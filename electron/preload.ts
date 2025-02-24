import { contextBridge, ipcRenderer, } from 'electron';

// contextBridge.exposeInMainWorld('electronAPI', {
//   toggleDark: (dark: boolean) => ipcRenderer.invoke('darkMode:toggle', dark),
// })


contextBridge.exposeInMainWorld('fileHandler', {
  write: async (file:string, data:string) => {
    await ipcRenderer.invoke('file:write', { file, data })
  },
  read: async (file:string) => {
    const data = await ipcRenderer.invoke('file:read', file);
    return data;
  },
  exists: async (file:string) => {
    const data = await ipcRenderer.invoke('file:exists', file);
    return data;
  },
  makeFolder: async (folder:string) => {
    await ipcRenderer.invoke('file:mkdir', folder);
  }
})

