# 🚀 CodeCraft — Interactive Code Editor with Sandboxed Execution

A full-stack interactive code editor that supports multi-language execution using a secure sandboxed environment.

> ⚠️ **Note:** Code execution is disabled in the live demo due to infrastructure limitations (Docker not supported on Vercel).
> ✅ Full functionality is available when running locally.

---

# 🌐 Live Demo

👉 https://code-click-five.vercel.app/

---

# 🧠 Features

* ⚡ Real-time code execution
* 🎨 Monaco-based editor (VS Code-like experience)
* 🔐 Authentication (Clerk)
* 💾 Snippet saving (Convex DB)
* 💳 Pro upgrade system (LemonSqueezy)
* 🐳 Secure sandboxed execution using Docker + Piston

---

# 🏗️ Architecture Overview

```
Frontend (Next.js)
        ↓
API Route (/api/execute)
        ↓
Piston (Docker sandbox)
        ↓
Language runtimes (Node, Python, C++, etc.)
```

---

# ⚠️ Why Code Execution Doesn’t Work in Production

Platforms like Vercel **do not support Docker or privileged containers**.

This project uses **Piston**, which requires:

* filesystem access
* process isolation
* containerization

👉 Therefore:

* ❌ Production (Vercel): execution disabled
* ✅ Local (Docker): execution works perfectly

---

# 🛠️ Local Setup (FULL GUIDE)

## 📦 Prerequisites

Install these FIRST:

### 1. Node.js (v18+)

#### Windows (PowerShell)

```powershell
winget install OpenJS.NodeJS
```

#### macOS/Linux (Bash)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

### 2. Docker (REQUIRED)

#### Windows

* Install Docker Desktop: https://www.docker.com/products/docker-desktop/
* Enable:

  * WSL2
  * Virtualization

#### macOS

```bash
brew install --cask docker
```

#### Linux

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

Verify:

```bash
docker --version
```

---

### 3. Git

```bash
git --version
```

If not installed:

#### Windows

```powershell
winget install Git.Git
```

#### Linux/macOS

```bash
sudo apt install git -y
```

---

# 📥 Clone the Repository

```bash
git clone https://github.com/Avishkar1234/CODE-CLICK.git
cd CODE-CLICK
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# 🐳 Run Piston (Code Execution Engine)

## Pull Image

```bash
docker pull ghcr.io/engineer-man/piston
```

## Run Container

```bash
docker run -d -p 2000:2000 --name piston ghcr.io/engineer-man/piston
```

Verify:

```bash
docker ps
```

---

# ⚙️ Environment Variables

Create `.env.local` in root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

NEXT_PUBLIC_CONVEX_URL=your_convex_url

LEMON_SQUEEZY_API_KEY=your_key
```

---

# ▶️ Run the App

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🧪 Test Code Execution

Try:

```js
console.log("Hello World");
```

👉 Output should appear instantly.

---

# 🛑 Common Issues

## ❌ "Execution unavailable"

✔ Make sure Docker is running

```bash
docker ps
```

---

## ❌ Port 2000 not working

```bash
docker restart piston
```

---

## ❌ Permission issues (Linux)

```bash
sudo usermod -aG docker $USER
```

Then restart terminal.

---

# 🧠 Supported Languages

Handled by Piston automatically:

* JavaScript (Node.js)
* Python
* C++
* Java
* Go
* Rust
* and more...

👉 No manual installation required — Docker handles everything.

---
# 🚀 Deployment Notes

| Feature        | Vercel (Production) | Local (Docker + Piston) |
|----------------|---------------------|--------------------------|
| UI             | ✅                  | ✅                       |
| Auth           | ✅                  | ✅                       |
| Database       | ✅                  | ✅                       |
| Code Execution | ❌                  | ✅                       |

> Code execution requires containerization, which is not supported on Vercel.
> Full functionality is available when running locally using Docker + Piston.
---

# 🎯 For Recruiters

> Code execution requires sandboxing via containers (Docker).
> Serverless platforms like Vercel do not support this for security reasons.
> This project handles that gracefully and works fully in a local environment.

---

# 📌 Future Improvements

* Switch to Judge0 / self-hosted execution API
* Add queue-based execution system
* Add rate limiting & usage quotas
* Improve execution logs & debugging

---

# 🤝 Contributing

Feel free to fork and improve!

---

# ⭐ If you liked this project

Give it a star ⭐ on GitHub — it helps a lot!

---

# 🧑‍💻 Author

Avishkar Mandlik
