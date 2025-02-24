import { app, BrowserWindow, ipcMain } from 'electron'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    frame: true,
    width: 1500,
    height: 900,
    minHeight: 400,
    minWidth: 300,
    icon: join(__dirname, '../public/favicon.ico'),
    titleBarStyle: 'default',
    titleBarOverlay: {
      color: '#f3f3f300',
      symbolColor: '#434343',
      height: 30,
    },
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
    },
  })

  ipcMain.handle('file:write', (event, { file, data }) => {
    fs.writeFileSync(join(app.getPath('userData'), file), data, 'utf-8');
  })

  ipcMain.handle('file:read', (event, file:string) => {
    const data = fs.readFileSync(join(app.getPath('userData'), file), { encoding: 'utf-8'});
    return data;
  })

  ipcMain.handle('file:exists', (event, file:string) => {
    const exists = fs.existsSync(join(app.getPath('userData'), file))
    return exists;
  })

  ipcMain.handle('file:mkdir', (event, folder:string) => {
    const exists = fs.existsSync(join(app.getPath('userData'), folder))
    if(!exists) {
      fs.mkdirSync(join(app.getPath('userData'), folder))
    }
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.webContents.openDevTools()
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html')
  }
})

app.on('browser-window-created', (e, win) => {
  win.removeMenu()
})
