import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import compileTemplate from './template.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send('Hello');
    
})

app.post('/generate-config', (req, res) => {
    console.log('Received data:', req.body);
  const data = req.body;

  // Generate the file content using Handlebars template
//   const configContent = compileTemplate(data);

  let configContent;
    try {
        configContent = compileTemplate(data);
        console.log('Data successfully mapped to template.');
    } catch (err) {
        console.error('Error compiling template:', err);
        return res.status(500).send('Error mapping data to template.');
    }

  // Define a file path for the generated config file
  const filePath = path.join(path.resolve(), 'generated_config.txt');
  fs.writeFileSync(filePath, configContent);

  // Send the file for download
  res.download(filePath, 'config.txt', (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).send('Error generating file');
    }
    //fs.unlinkSync(filePath); // Delete file after sending
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
