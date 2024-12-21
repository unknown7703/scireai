# Scire AI

Scire AI is a research assistant AI designed to enhance your research experience. With Scire AI, you can upload PDF files, select text you don’t understand, and ask AI for explanations—all within the same window.

## Features

- **PDF Viewer:** Open and read any PDF file in the app.
- **Text Selection & AI Assistance:** Highlight text in the PDF, right-click, and query the AI for clarification.
- **Integrated AI Chat:** Chat with AI in a dedicated panel for seamless interaction.

## Demo

🔗 [Scire AI Demo](https://scireai.vercel.app/)  
Experience the functionality of Scire AI in a simulated environment.

## Installation

Follow the instructions below to set up Scire AI locally.

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### Steps

1. Clone the repository:
   ```bash
   git clone git@github.com:unknown7703/scireai.git
   ```
   ```bash
   cd scireai
   ```
   ```bash
   npm install
   ```
2. Make an Llm key from groq (https://groq.com/) add .env in root with key name given in groq.js

3. Initiliaze tailwind with
   ```bash
   tailwind init -y
   ```

4. Start your application in local port

   ```bash
   npm start
   ```



## Usage
1. **Upload a PDF:** Click "Upload Your File" and select a PDF document.
2. **Select Text:** Highlight any text you wish to query.
3. **Ask AI:** Right-click and choose to query AI. Responses will appear in the chat panel.

## Technologies Used

- **Frontend:**
  - React.js
  - @react-pdf-viewer/core
  - Tailwind CSS
- **LLMs**
  - llama3-8b-8192 hosted on groq
- **Hosting**
  - Vercel

## Folder Structure

    Scire-AI/
    ├── public/
    ├── src/
    │   ├── assets/         # Icons and images
    │   ├── components/     # Reusable components (Navbar, ChatBubble, etc.)
    │   ├── api/            # API integrations
    │   ├── App.js          # Main application file
    │   ├── index.js        # React entry point
    ├── package.json


