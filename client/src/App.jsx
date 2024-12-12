import React, {useState, useEffect } from 'react'
import * as XLSX from 'xlsx';
import uploadExcelData from './api/uploadExcelData';
import './App.css'
import { TfiHarddrives } from "react-icons/tfi";
import Footer from './components/Footer/Footer.jsx';

function App() {

  const [input, setInput] = useState(false);
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [countdown, setCountdown] = useState(5);

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

      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const jsonData = {};

      rows.forEach(row => {
        if (row[0] && row[1]) { 
          jsonData[row[0]] = row[1];
        }
      });
      setExcelData(jsonData);
      console.log('Excel data:', jsonData);

      // try {
      //   const result = await uploadExcelData(jsonData);
      //   console.log('File uploaded successfully:', result);
      // } catch (error) {
      //   console.error('Error uploading file:', error);
      // }

      try {
        await uploadExcelData(jsonData);
        const response = await fetch('http://localhost:5000/generate-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData),
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'config.txt';
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    reader.readAsArrayBuffer(selectedFile);
    setFile(selectedFile);
    // setCountdown(5);
  };

  useEffect(() => {
    if (file && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [file, countdown]);

  return (
    <>
      <div className='title'>
        <TfiHarddrives color='#007bff' size={24} />
        <h2>Switch config generator</h2>
      </div>
      <div className='instructions'>
        <h3>Instructions:</h3> 
        <p>Input your excel file having the info of the switch.</p> 
        <p>Once the file is inputed then wait for 5 sec, the config.txt file will be automatically generated and downloaded.</p> 
        <p>NOTE: No other excel format is applicable in generating config files. Only use the sample format provided on github.</p> 
      </div>
      <button className='inputbtn' onClick={change}>Let's Start</button>

      {input && 
        <div className='choosebtn'>
          <input
            type="file"
            accept=".xlsx, .xls, .xlsm"
            onChange={handleFileChange}
          />
          {file && <p>Uploaded file: {file.name}</p>}
        </div>
      }

      {file && 
        <div className='download'>
          <p>Will automatically download in {countdown} seconds...</p>
          <p>*This generator is Prone to errors, please go through the output once before using it.</p>
        </div>
      }

      <Footer/>

      {/* {excelData && (
        <div>
          <h3>Parsed Excel Data:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )} */}
    </>
  )
}

export default App
