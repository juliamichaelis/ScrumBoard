const { app, ipcMain, BrowserWindow, Tray } = require('electron')
const fs = require('fs');
var path = require('path')

// Lokalisierung

app.commandLine.appendSwitch('--lang','de-DE');  
app.commandLine.appendSwitch("--no-sandbox");
// Behalten Sie eine globale Referenz auf das Fensterobjekt. 
// Wenn Sie dies nicht tun, wird das Fenster automatisch geschlossen, 
// sobald das Objekt dem JavaScript-Garbagekollektor übergeben wird.

let win

function createWindow () {
  const appIcon = new Tray(__dirname + "/assests/icons/png/256x256.png");
  console.log(__dirname + "/assests/icons/png/256x256.png");
  // Erstellen des Browser-Fensters.
  win = new BrowserWindow({
    webPreferences: {
<<<<<<< HEAD
        nodeIntegration: true,
        enableRemoteModule: true
=======
        nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
    },
    icon: path.join(__dirname, '/assests/mi-kan.png')
  })
  win.setMenuBarVisibility(false);
  //win.setIcon(__dirname + "/assests/mi-kan.png");
  win.maximize();
  // und Laden der index.html der App.
  win.loadFile('./html/index.html');
<<<<<<< HEAD
  win.setClosable(true);
=======
  win.setClosable(false);
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
 

  
  // Öffnen der DevTools.
  //win.webContents.openDevTools()
 
  win.on('close', (e) => {
    e.preventDefault();
    win.webContents.send("closeWindow");
  })
 
  

  // Ausgegeben, wenn das Fenster geschlossen wird.
  win.on('closed', () => {
    console.log("closed");
    // Dereferenzieren des Fensterobjekts, normalerweise würden Sie Fenster
    // in einem Array speichern, falls Ihre App mehrere Fenster unterstützt. 
    // Das ist der Zeitpunkt, an dem Sie das zugehörige Element löschen sollten.
  });
  

}

// Diese Methode wird aufgerufen, wenn Electron mit der
// Initialisierung fertig ist und Browserfenster erschaffen kann.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.on('ready', (event,args) => {
  var homepath = app.getPath("home");
  var confDir = homepath + "/" + ".mi-scrum";
  var configure = {
    lastFile: "",
    automaticSave: "true"
  };
  var confFile = confDir + "/" + "config.json";
  
  if(!fs.existsSync(confDir)){
    fs.mkdirSync(confDir);
  }
  if(!fs.existsSync(confFile)){
    var configString = JSON.stringify(configure);
    fs.writeFileSync(confFile, configString);
  }
  else {
    var configString = fs.readFileSync(confFile);
    configure = JSON.parse(configString);
  }
  console.log(configure);
  createWindow();
  win.webContents.once('did-finish-load', () => {
    win.webContents.send("load",configure.lastFile);
  },configure.lastFile);
  
})



// Verlassen, wenn alle Fenster geschlossen sind.
app.on('window-all-closed', () => {
  // Unter macOS ist es üblich für Apps und ihre Menu Bar
  // aktiv zu bleiben bis der Nutzer explizit mit Cmd + Q die App beendet.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  console.log("lang", app.getLocale());
  // Unter macOS ist es üblich ein neues Fenster der App zu erstellen, wenn
  // das Dock Icon angeklickt wird und keine anderen Fenster offen sind.
  if (win === null) {
    createWindow()
  }
})



