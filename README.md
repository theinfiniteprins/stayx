# StayX 🏠

StayX is a modern rental property platform built using the **MERN stack**. It allows users to explore, list, and rent properties easily with a clean and intuitive interface.

> 🔗 This repository contains only the **frontend** part of the application.  
> 👉 Backend repo: [RentX-backend](https://github.com/Niraj-Node/RentX-backend)

---

## 🚀 Features

- Browse rental properties with images, details, and locations  
- List your property with image uploads via **Cloudinary**  
- Authentication & protected routes  
- Modern UI using **React**, **Tailwind CSS**, and **React Router**  
- Integration with backend APIs for seamless functionality  

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router  
- **Backend**: [Node.js, Express.js, MongoDB](https://github.com/Niraj-Node/RentX-backend)  
- **Image Hosting**: Cloudinary  

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/theinfiniteprins/stayx.git
cd stayx
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory and add the following:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> 🔐 Replace `your_cloud_name` and `your_upload_preset` with actual values from your Cloudinary account.

### 4. Run the app

```bash
npm run dev
```

The app will run on: [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```
stayx/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
└── vite.config.js
```

---

## 📸 Screenshots

<!-- Add screenshots of the app UI here -->
![image](https://res.cloudinary.com/datwzfboc/image/upload/v1744103235/Screenshot_2025-04-08_143151_wae2li.png)
![image](https://res.cloudinary.com/datwzfboc/image/upload/v1744103234/Screenshot_2025-04-08_143220_df7vbw.png)
![image](https://res.cloudinary.com/datwzfboc/image/upload/v1744103235/Screenshot_2025-04-08_143242_g0uowp.png)
---

## 📚 Backend

The backend for this project is available here:  
🔗 [RentX-backend GitHub Repository](https://github.com/Niraj-Node/RentX-backend)

---

## 🙌 Contribution

Feel free to fork the project and submit pull requests. All contributions are welcome!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🧑‍💻 Developed by

- [@theinfiniteprins](https://github.com/theinfiniteprins)
- [@Niraj-Node](https://github.com/Niraj-Node)
