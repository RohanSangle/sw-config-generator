import axios from 'axios';

const uploadExcelData = async (parsedData) => {
  try {
    console.log('Sending data:', parsedData);  // Log the data being sent
    const response = await axios.post('https://sw-config-generator.onrender.com/generate-config', parsedData, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob', // Important for handling binary data (the file)
    });
    // return response.data; // assuming the backend returns some data or URL
    // Create a link element to download the file
    const downloadLink = document.createElement('a');
    const blob = new Blob([response.data], { type: 'application/octet-stream' });

    // Create a URL for the Blob and set it as the download URL
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'config.txt'; // The filename you want the user to see
    downloadLink.click(); // Trigger the download

    console.log('File downloaded successfully');
  } catch (error) {
    console.error('Error uploading Excel data:', error);
    throw error;
  }
};

export default uploadExcelData;
