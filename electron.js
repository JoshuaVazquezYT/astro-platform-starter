const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    icon: path.join(__dirname, 'public/favicon.svg'),
    show: false,
    titleBarStyle: 'hidden',
    frame: false
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:4321');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for XP OS functionality
ipcMain.handle('get-system-info', () => {
  return {
    platform: process.platform,
    version: process.version,
    arch: process.arch
  };
});

ipcMain.handle('open-external-link', (event, url) => {
  shell.openExternal(url);
});

ipcMain.handle('show-message-box', (event, options) => {
  return dialog.showMessageBox(mainWindow, options);
});