import React, {useState} from 'react'
import * as XLSX from 'xlsx';
import uploadExcelData from './api/uploadExcelData';
import './App.css'

// import config from './assets/192-168-1-2.txt'

function App() {

  const [input, setInput] = useState(false);
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const change = () => {
    setInput(!input);
  }

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // const jsonData = XLSX.utils.sheet_to_json(sheet);

      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const jsonData = {};

      rows.forEach(row => {
        if (row[0] && row[1]) { // Ensure both key and value exist in the row
          jsonData[row[0]] = row[1]; // Assign first column as key, second column as value
        }
      });
      setExcelData(jsonData);
      console.log('Excel data:', jsonData);  // Log parsed data

      try {
        const result = await uploadExcelData(jsonData);
        console.log('File uploaded successfully:', result);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    reader.readAsArrayBuffer(selectedFile);
    setFile(selectedFile);
  };

  return (
    <>
      <p>Welcome to switch config file generator</p>
      <button onClick={change}>Input excel file</button>

      {input && 
        <div>
          <input
            type="file"
            accept=".xlsx, .xls, .xlsm"
            onChange={handleFileChange}
          />
          {file && <p>Uploaded file: {file.name}</p>}
        </div>
      }

      {excelData && (
        <div>
          <h3>Parsed Excel Data:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}

      {input && (file!=null) &&
        <a href={config} download>
          <button>Download config file</button>
        </a>
      }
    </>
  )
}

export default App
