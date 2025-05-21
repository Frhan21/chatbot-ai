# 🤖 Chatbot AI Frontend

Frontend ini merupakan antarmuka pengguna untuk mengirimkan pesan ke server chatbot yang terhubung dengan LLM (Groq via LangChain).

## 🧱 Teknologi yang Digunakan

- React.js (Vite)
- Axios (untuk komunikasi HTTP)
- TailwindCSS (optional, untuk styling)

## 🚀 Cara Menjalankan

```bash
cd client
npm install
npm run dev
```

Akses di browser melalui: `http://localhost:5173`

## 📌 Catatan

- Pastikan server berjalan di `http://localhost:8080`
- Pesan akan dikirim sebagai array `messages` dengan format `{ role: 'user' | 'system' | 'assistant', content: string }`.

# 🧠 Chatbot AI Backend (Node.js + LangChain + Groq)

Backend ini menerima pesan dari client dan meneruskannya ke LLM (Groq) melalui LangChain, lalu mengembalikan respon.

## 🧱 Teknologi yang Digunakan

- Node.js
- Express.js
- LangChain.js
- Groq Chat Model
- dotenv

## 🚀 Cara Menjalankan

1. Instal dependensi:

```bash
cd server
npm install
```

2. Buat file `.env`

```bash
GROQ_API_KEY=your_groq_api_key_here
```

3. Jalankan server

```bash
npm run dev
```

Server akan jalan di `http://localhost:8080`

## 📩 Struktur Request

Endpoint `POST /api/chat`
Payload JSON:

```json
{
  "messages": [
    { "role": "system", "content": "Halo, ada yang bisa saya bantu ?" },
    { "role": "user", "content": "halo" }
  ]
}
```

## 📤 Struktur Respon

```json
{
  "reply": "Halo juga! Apa yang bisa saya bantu?"
}
```
