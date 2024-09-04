import { app, BrowserWindow,BaseWindow, WebContentsView ,ipcMain } from 'electron';
import path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  const win = new BaseWindow({ width: 800, height: 400 })
  win.on('resize', () => {
    const bounds = win.getBounds();
    tab.setBounds({ x: 0, y: 0, width: bounds.width, height: 50 })
    main.setBounds({ x: 0, y: 50, width: bounds.width, height: bounds.height - 50 })
  })
  const tab = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  const main = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  tab.setBounds({ x: 0, y: 0, width: 800, height: 50 })
  main.setBounds({ x: 0, y: 50, width: 800, height: 350 })
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    main.webContents.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    main.webContents.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_DEV_SERVER_URL}/index.html`));
  }
  if (TAB_WINDOW_VITE_DEV_SERVER_URL) {
    tab.webContents.loadURL(TAB_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    tab.webContents.loadFile(path.join(__dirname, `../renderer/${TAB_WINDOW_VITE_DEV_SERVER_URL}/index.html`));
  }
  win.contentView.addChildView(tab)
  win.contentView.addChildView(main)
  ipcMain.on('set-url', (event, url) => {
    main.webContents.loadURL(url)
  })
  main.webContents.setWindowOpenHandler((details) => {
    main.webContents.loadURL(details.url)
    return {action: 'deny'}
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
