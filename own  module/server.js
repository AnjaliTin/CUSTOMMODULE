// server.js
const http = require('http');
const querystring = require('querystring');
const myModule = require('./mymodule');
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Show input form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <head>
                <title>Welcome</title>
                <style>
                    body {
                        font-family: 'Segoe UI', sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background: linear-gradient(to right, #74ebd5, #ACB6E5);
                        margin: 0;
                    }
                    .card {
                        background: white;
                        padding: 40px;
                        border-radius: 15px;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                        text-align: center;
                    }
                    h1 {
                        margin-bottom: 10px;
                    }
                    input {
                        padding: 10px;
                        width: 250px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        margin-top: 10px;
                    }
                    button {
                        margin-top: 20px;
                        padding: 10px 20px;
                        background-color: #007acc;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    button:hover {
                        background-color: #005f99;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Welcome to our Node.js App</h1>
                    <form method="POST">
                        <input type="text" name="username" placeholder="Enter your name" required />
                        <br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const postData = querystring.parse(body);
            const name = postData.username || 'Guest';
            const message = myModule.getHelloMessage(name);
            const currentTime = myModule.getCurrentTime();
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <head>
                    <title>Greeting</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', sans-serif;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            background: linear-gradient(to right, #ffe29f, #ffa99f);
                            margin: 0;
                        }
                        .card {
                            background: white;
                            padding: 40px;
                            border-radius: 15px;
                            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                            text-align: center;
                        }
                        h1, h2 {
                            margin: 10px 0;
                        }
                        button {
                            margin-top: 30px;
                            padding: 10px 20px;
                            background-color: #ff6b6b;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 16px;
                        }
                        button:hover {
                            background-color: #e85050;
                        }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>${message}</h1>
                        <h2 id="clock">Current time is: ${currentTime}</h2>
                        <button onclick="window.location.href='/'">Back</button>
                        <script>
                            function updateClock() {
                                const now = new Date();
                                document.getElementById('clock').innerText = "Current time is: " + now.toLocaleString();
                            }
                            setInterval(updateClock, 1000);
                            updateClock();
                        </script>
                    </div>
                </body>
                </html>
            `);
        });
    }
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log("🌐 Server running at http://localhost:3000");
});
