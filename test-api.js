import axios from 'axios';
async function run() {
  try {
    const login = await axios.post('http://localhost:3000/api/login', {
      email: 'superadmin@organisasi-hub.com',
      password: 'SuperAdmin123!'
    });
    const token = login.data.data.accessToken;
    
    const res = await axios.get('http://localhost:3000/api/positions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
run();
