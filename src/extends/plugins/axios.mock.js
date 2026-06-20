const initNews = [
  { id: "1", title: "Pemeliharaan Pipa Transmisi Utama", description: "PDAM Berau melakukan pemeliharaan pipa transmisi utama di Jl. Gatot Subroto untuk mengantisipasi kebocoran debit air." },
  { id: "2", title: "Sosialisasi Program Penghematan Air", description: "Menghadapi musim kemarau, PDAM Berau menghimbau seluruh masyarakat untuk menghemat penggunaan air bersih sehari-hari." },
  { id: "3", title: "Kenaikan Mutu Air Bersih Triwulan I", description: "Berdasarkan uji laboratorium berkala, kualitas kelayakan konsumsi air bersih PDAM Berau meningkat menjadi 99% layak pakai." }
];

const initUsers = [
  { id: "1", nama: "Super Admin", email: "admin@berau.go.id", username: "admin", role: "ADMIN_APLIKASI" },
  { id: "2", nama: "Ahmad Staff", email: "staff@berau.go.id", username: "ahmad_staff", role: "ADMIN" }
];

const getNews = () => {
  const data = localStorage.getItem("mock.news");
  if (!data) {
    localStorage.setItem("mock.news", JSON.stringify(initNews));
    return initNews;
  }
  return JSON.parse(data);
};

const saveNews = (list) => {
  localStorage.setItem("mock.news", JSON.stringify(list));
};

const getUsers = () => {
  const data = localStorage.getItem("mock.user");
  if (!data) {
    localStorage.setItem("mock.user", JSON.stringify(initUsers));
    return initUsers;
  }
  return JSON.parse(data);
};

const saveUsers = (list) => {
  localStorage.setItem("mock.user", JSON.stringify(list));
};

export default function mockAdapter(config) {
  return new Promise((resolve, reject) => {
    let path = config.url;
    
    // Bersihkan path dari baseURL jika ada
    if (config.baseURL && path.startsWith(config.baseURL)) {
      path = path.slice(config.baseURL.length);
    }
    
    // Jika URL berupa full URL, ambil bagian path-nya saja
    if (path.startsWith("http://") || path.startsWith("https://")) {
      try {
        path = new URL(path).pathname;
      } catch (e) {
        const parts = path.split("/v1/api/");
        if (parts.length > 1) {
          path = "/v1/api/" + parts[1];
        }
      }
    }
    
    if (!path.startsWith("/")) {
      path = "/" + path;
    }

    const method = config.method.toUpperCase();
    const data = config.data ? JSON.parse(config.data) : null;

    // Helper untuk merespon panggilan axios
    const respond = (status, body) => {
      // Tambahkan jeda waktu kecil untuk mensimulasikan latency jaringan nyata
      setTimeout(() => {
        resolve({
          data: body,
          status: status,
          statusText: status === 200 || status === 201 ? "OK" : "Error",
          headers: {},
          config: config,
        });
      }, 300);
    };

    console.log(`[Mock API Request] ${method} ${path}`, data);

    // 1. Panggilan Login
    if (method === "POST" && path === "/v1/api/auth/login") {
      return respond(200, {
        status: "success",
        data: {
          access_token: "mock_jwt_access_token_for_user_session",
          refresh_token: "mock_jwt_refresh_token_for_user_session"
        }
      });
    }

    // 2. Profile User (Me)
    if (method === "GET" && path === "/v1/api/auth/me") {
      return respond(200, {
        status: "success",
        data: {
          id: "1",
          nama: "Super Admin",
          email: "admin@berau.go.id",
          username: "admin",
          role: "ADMIN_APLIKASI"
        }
      });
    }

    // 3. Refresh Token
    if (method === "POST" && path === "/v1/api/auth/refresh-token") {
      return respond(201, {
        access_token: "new_mock_jwt_access_token"
      });
    }

    // 4. CRUD Berita (News)
    if (path === "/v1/api/news") {
      if (method === "GET") {
        return respond(200, {
          status: "success",
          data: getNews()
        });
      }
      if (method === "POST") {
        const newsList = getNews();
        const newItem = {
          id: String(Date.now()),
          title: data.title,
          description: data.description
        };
        newsList.push(newItem);
        saveNews(newsList);
        return respond(200, {
          status: "success",
          message: "Berhasil disimpan"
        });
      }
    }

    // Update / Delete Berita dengan ID
    const newsMatch = path.match(/^\/v1\/api\/news\/(.+)$/);
    if (newsMatch) {
      const id = newsMatch[1];
      const newsList = getNews();

      if (method === "PUT") {
        const index = newsList.findIndex((item) => item.id === id);
        if (index !== -1) {
          newsList[index] = { ...newsList[index], title: data.title, description: data.description };
          saveNews(newsList);
        }
        return respond(200, {
          status: "success",
          message: "Berhasil disimpan"
        });
      }

      if (method === "DELETE") {
        const updatedList = newsList.filter((item) => item.id !== id);
        saveNews(updatedList);
        return respond(200, {
          status: "success",
          message: "Berhasil dihapus"
        });
      }
    }

    // 5. CRUD User
    if (path === "/v1/api/user") {
      if (method === "GET") {
        return respond(200, {
          status: "success",
          data: getUsers()
        });
      }
      if (method === "POST") {
        const userList = getUsers();
        const newUser = {
          id: String(Date.now()),
          nama: data.nama,
          email: data.email,
          username: data.username,
          role: data.role
        };
        userList.push(newUser);
        saveUsers(userList);
        return respond(200, {
          status: "success",
          message: "Berhasil disimpan"
        });
      }
    }

    // Detail / Update / Delete User dengan ID
    const userMatch = path.match(/^\/v1\/api\/user\/(.+)$/);
    if (userMatch) {
      const id = userMatch[1];
      const userList = getUsers();

      if (method === "GET") {
        const userObj = userList.find((item) => item.id === id);
        return respond(200, {
          status: "success",
          data: userObj || {}
        });
      }

      if (method === "PUT") {
        const index = userList.findIndex((item) => item.id === id);
        if (index !== -1) {
          userList[index] = {
            ...userList[index],
            nama: data.nama,
            email: data.email,
            username: data.username,
            role: data.role
          };
          saveUsers(userList);
        }
        return respond(200, {
          status: "success",
          message: "Berhasil disimpan"
        });
      }

      if (method === "DELETE") {
        const updatedList = userList.filter((item) => item.id !== id);
        saveUsers(updatedList);
        return respond(200, {
          status: "success",
          message: "Berhasil dihapus"
        });
      }
    }

    // Endpoint tidak terdaftar di mock
    console.warn(`[Mock API Warning] Endpoint tidak ter-mock: ${method} ${path}`);
    respond(404, { message: "Mock endpoint not found" });
  });
}
