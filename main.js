const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain}=require('electron')

let win

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

ipcMain.on('openFile',(event,arg)=>{
  const {dialog}=require('electron')
  const fs=require('fs')

  ipcMain.on('click-button',(event,arg)=>{
    if(arg=='true'){
      dialog.showOpenDialog(function(fileNames){
        if(fileNames==undefined){
          console.log("No file selected");
        }
        else {
          readFile(fileNames[0])
        }
      })
    }
  })

function readFile(filepath){
  fs.readFile(filepath,'utf-8',(err,data)=>{
    if(err){
      alert("An error :"+err.message)
      return
    }
    event.sender.send('fileData',data)
  })
}

})



app.on('ready', createWindow)
