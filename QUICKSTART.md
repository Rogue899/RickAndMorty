# Quick Start Guide

## Prerequisites Installation

If you don't have Node.js and npm installed, follow these steps:

### Windows

1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Choose the LTS (Long Term Support) version
3. Run the installer and follow the prompts
4. Verify installation by opening a new terminal and running:
   ```bash
   node --version
   npm --version
   ```

### macOS

Using Homebrew:
```bash
brew install node
```

Or download from [nodejs.org](https://nodejs.org/)

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Running the Project

Once Node.js is installed:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to the URL shown (usually `http://localhost:5173`)

## Running Tests

```bash
npm test
```

## Building for Production

```bash
npm run build
```

That's it! See the main README.md for more detailed documentation.

