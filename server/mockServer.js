const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());



app.post('/api/check-url', async (req, res) => {
    const { url } = req.body;


    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default(url, { method: 'HEAD' });

        if (response.ok) {
            const isFolder = url.endsWith("/");
            const isFile = url.includes(".");

            let message;
            if (isFolder) {
                message = "URL exists and it's a folder.";
            } else if (isFile) {
                message = "URL exists and it's a file.";
            } else {
                message = "URL exists.";
            }

            return res.status(200).json({ message });
        } else {
            return res.status(404).json({ message: "URL does not exist." });
        }
    } catch (error) {
        console.log('error>',error)
        return res.status(500).json({ message: "URL does not exist." });
    }
});

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});
