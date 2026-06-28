import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

async function run() {
  try {
    const login = await axios.post('http://localhost:3000/api/login', {
      email: 'superadmin@organisasi-hub.com',
      password: 'SuperAdmin123!'
    });
    const token = login.data.data.accessToken;
    
    fs.writeFileSync('dummy.jpg', 'dummy image content');
    
    const formData = new FormData();
    formData.append('file', fs.createReadStream('dummy.jpg'));
    
    const uploadRes = await axios.post('http://localhost:3000/api/uploads', formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders()
      }
    });
    console.log("Response:", JSON.stringify(uploadRes.data, null, 2));
    
    // Simulate what frontend does
    const responseData = uploadRes.data.data || uploadRes.data;
    console.log("responseData.url:", responseData.url);
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}
run();
