const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
app.use(cors());

const apiKey = 'YOUR_API_KEY';

app.get('/dogs', (req, res) => {
    const options = {
        hostname: 'api.thedogapi.com',
        path: '/v1/images/search',
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'User-Agent': 'Node.js'
        }
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const dogImage = JSON.parse(data)[0].url; // data[0] obtem apenas a url da imagem
            res.send(`<img src="${dogImage}" alt="Dog" />`);  // ai aqui retorna a imagem como HTML
        });
    });

    request.on('error', (error) => {
        console.error('Erro na requisição:', error);
        res.status(500).json({ message: 'Erro ao buscar dados da The Dog API' });
    });

    request.end();
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
