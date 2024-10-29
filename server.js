const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const messagesFile = 'messages.json';

app.use(bodyParser.json());
app.use(express.static('public')); 

app.get('/messages', (req, res) => {
    fs.readFile(messagesFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading messages');
        }
        res.send(JSON.parse(data));
    });
});

// 
app.post('/messages', (req, res) => {
    fs.readFile(messagesFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading messages');
        }
        const messages = JSON.parse(data || '[]');
        messages.push(req.body.message);
        fs.writeFile(messagesFile, JSON.stringify(messages), (err) => {
            if (err) {
                return res.status(500).send('Error saving message');
            }
            res.send('Message saved');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
