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
     <div id="top" style="display:flex; height:150px; flex-direction:row; margin-left:130px;">
         <div id="title" style="display:flex; font-size:80px;">
             jukeboxd
         </div>
         <nav id="header" role="navigation" style="display:flex; flex-direction:row;">
             <div id="signIn" style="padding:20px;">
                <a style="color:blue; margin:30px;" href="./signIn.html">
                <button style="min-height:30px;min-width:60px;font-weight:bold;color:blue">
                    Sign In
                </button>
                </a>
             </div>
             <div id="createAccount" style="padding:20px;">
                <a style="color:blue; margin:30px;" href="./createAccount.html">
                <button style="min-height:30px;min-width:60px;font-weight:bold;color:blue">
                    Create Account
                </button>
                </a>
             </div>
             <div id="songsAlbums" style="padding:20px;">
                <a style="color:blue; margin:30px;" href="./songsAlbums.html">
                <button style="min-height:30px;min-width:60px;font-weight:bold;color:blue">
                    Songs/Albums
                </button>
                </a>
             </div>
             <div id="lists" style="padding:20px;">
                <a style="color:blue; margin:30px;" href="./lists.html">
                <button style="min-height:30px;min-width:60px;font-weight:bold;color:blue">
                    Lists
                </button>
                </a>
             </div>
             <div id="members" style="padding:20px;">
                <a style="color:blue; margin:30px;" href="./members.html">
                <button style="min-height:30px;min-width:60px;font-weight:bold;color:blue">
                    Members
                </button>
                </a>
             </div>
         </nav>
    </div>
    <div id="content" style="height:100%; width:100%; display:flex; flex-direction:row;">
        <div id="content-left" style="width:20%; height:100%;">
    
        </div>
        <div id="content-center" style="width:60%; height:100%; margin:50px;">
            <div id="mostPop" style="text-align:center;">
                Image of most popular song cover or album cover
            </div>
            <div id="ad" style="text-align:center; margin:50px;">
                TRACK SONGS YOU'VE LISTENED <br>
                SAVE THOSE YOU WANT TO HEAR <br>
                TELL YOUR FRIENDS WHAT'S GOOD
            </div>
            <div id="button" style="display:flex; justify-content:center; margin:50px;">
                <button>
                GET STARTED - IT'S FREE!
                </button>
            </div>
        </div>
        <div id="content-right" style="width:20%; height:100%;">
    
        </div>
    </div>

  </body>`)
});

app.get('/*.css', (req, res) => res.send('css'))
app.use(express.static('public'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))