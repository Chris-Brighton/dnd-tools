export default function useFile() {
  async function read(file) {
    const data = await window.fileHandler.read(`${file}.json`);
    return JSON.parse(data);
  }
  function write(file, data) {
    window.fileHandler.write(`${file}.json`, JSON.stringify(data, null, 2));
  }
  return { read, write }
}
