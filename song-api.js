const http = require('http');
const express = require('express')
const cors = require('cors');
const app = express()

const hostname = '127.0.0.1'
const port = 3000;

const fs = require('fs');

app.use(cors());
app.use(express.static("files"))

app.get('/', (req, res) => {
    res.send(`<head>
    <title>
    Jukeboxd
    </title>
  </head>
  <body>
     <div id="top" style="display:flex; height:300px; flex-direction:row;">
         <div id="title" style="display:flex; font-size:80px;">
             jukeboxd
         </div>
         <nav id="header" role="navigation" style="display:flex; flex-direction:row;">
             <div id="signIn" style="padding:20px;">
             <a style="color:blue; margin:30px;" href="./signIn.html">Sign In</a>
             </div>
             <div id="createAccount" style="padding:20px;">
             <a style="color:blue; margin:30px;" href="./createAccount.html">Create Account</a>
             </div>
             <div id="songsAlbums" style="padding:20px;">
             <a style="color:blue; margin:30px;" href="./songsAlbums.html">Songs/Albums</a>
             </div>
             <div id="lists" style="padding:20px;">
             <a style="color:blue; margin:30px;" href="./lists.html">Lists</a>
             </div>
             <div id="members" style="padding:20px;">
             <a style="color:blue; margin:30px;" href="./members.html">Members</a>
             </div>
         </nav>
     </div>
     <div id="content">
 
     </div>
  </body>`)
});

app.get('/*.css', (req, res) => res.send('css'))
app.use(express.static('public'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//app.get('*', (req, res) => res.sendStatus(404));