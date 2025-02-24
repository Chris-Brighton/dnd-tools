interface FileManager {
  read: (file:string) => Promise<object|Array<object>>
  write: (file:string, data:Array<object>|object) => Promise<void>
  exists: (file:string) => Promise<boolean>
  makeFolder: (folder:string) => Promise<void>
}

export default function useFile():FileManager {
  async function read(file:string) {
    const data = await window.fileHandler.read(`${file}.json`);
    return JSON.parse(data);
  }
  async function write(file:string, data:Array<any>|object) {
    await window.fileHandler.write(`${file}.json`, JSON.stringify(data, null, 2));
  }
  async function exists(file:string) {
    const data = await window.fileHandler.exists(`${file}.json`)
    return data;
  }
  async function makeFolder(folder:string) {
    await window.fileHandler.makeFolder(folder);
  }
  return { read, write, exists, makeFolder }
}
