<<<<<<< HEAD
const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('./server');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Aguarda a API iniciar antes de carregar a interface
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3000');
  }, 2000);

  // Abre as ferramentas de desenvolvedor (opcional)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
=======
const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('./server');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Aguarda a API iniciar antes de carregar a interface
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3000');
  }, 2000);

  // Abre as ferramentas de desenvolvedor (opcional)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
>>>>>>> 49115495bf2c9183b9f32cc97f1b6740527c3c3e
}); 