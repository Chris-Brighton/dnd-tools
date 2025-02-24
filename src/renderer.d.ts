export interface IElectronAPI {
  toggleDark: (dark: boolean) => Promise<void>
}

export interface FileHandler {
  read: (file:string) => Promise<string>,
  write: (file:string, data:string) => Promise<void>,
  exists: (file:string) => Promise<boolean>,
  makeFolder: (folder:string) => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
    fileHandler: FileHandler
  }
}
