import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { contextMenuLookup, groqChat } from "../api/groq.js";
import Navbar from "./Navbar.js";
import ChatBubble from "./ChatBubble.jsx";

function Main() {
  const [pdfFile, setPdfFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [tempSelectedText, setTempSelectedText] = useState("");
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  // PDF HANDLE
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfFile(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
  };
  // CONTEXT MENU VISIBLE
  const handleContextMenu = (event) => {
    event.preventDefault();
    const selectedText = window.getSelection().toString();
    setTempSelectedText(selectedText);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };
  // ADD MESSAGE
  const addMessageToChatHistory = (sender, message) => {
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { sender, message },
    ]);
  };
  //USER INPUT
  const handleSendMessage = async () => {
    setUserInput("");
    try {
      const response = await groqChat(userInput);
      if (userInput.trim() === "") return;
      addMessageToChatHistory("user", userInput);
      const result = response.choices[0]?.message?.content || "No response";
      addMessageToChatHistory("bot", result);
    } catch (error) {
      console.error("Error in fetching data:", error);
      addMessageToChatHistory("bot", "Error in fetching data");
    }
  };
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  // CONTEXT MENU CLICK
  const handleMenuClick = async () => {
    setContextMenuVisible(false);
    try {
      const response = await contextMenuLookup(tempSelectedText);
      if (tempSelectedText.trim() === "") return;
      addMessageToChatHistory("user", tempSelectedText);
      const result = response.choices[0]?.message?.content || "No response";
      console.log("contextMenuLookup result:", result);
      addMessageToChatHistory("bot", result);
    } catch (error) {
      console.error("Error in fetching data:", error);
      addMessageToChatHistory("bot", "Error in fetching data");
    }
  };

  useEffect(() => {
    document.addEventListener("click", () => setContextMenuVisible(false));
    return () => {
      document.removeEventListener("click", () => setContextMenuVisible(false));
    };
  }, []);

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      <div
        className="left-panel"
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #ccc",
        }}
      >
        {pdfFile ? (
          <>
            <Navbar
              zoomPluginInstance={zoomPluginInstance}
              pageNavigationPluginInstance={pageNavigationPluginInstance}
              handleRemovePdf={handleRemovePdf}
            />
            <div
            className="flex overflow-auto"
            
              onContextMenu={handleContextMenu}
            >
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer
                  fileUrl={pdfFile}
                  plugins={[zoomPluginInstance, pageNavigationPluginInstance]}
                />
              </Worker>
            </div>
          </>
        ) : (
          <div style={{ padding: "20px" }}>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-4"
            />
          </div>
        )}
      </div>
      <div
        className="right-panel"
        style={{ flex: 1, padding: "20px", overflow: "auto" }}
      >
        <div className="w-[100%] mx-auto h-[100%] rounded-lg flex flex-col justify-between p-4 bg-white shadow-lg dark:bg-[#212121]">
          <div className="flex-grow overflow-y-auto mb-4 space-y-2">
            {chatHistory.map((chat, index) => (
              <ChatBubble
                key={index}
                sender={chat.sender}
                message={chat.message}
              />
            ))}
          </div>
          <div className="flex dark:bg-[#2F2F2F]">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none dark:bg-[#2F2F2F] text-white"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {contextMenuVisible && (
        <div
          className="context-menu"
          style={{
            position: "absolute",
            top: `${contextMenuPosition.y}px`,
            left: `${contextMenuPosition.x}px`,
            backgroundColor: "white",
            border: "1px solid #ccc",
            zIndex: 1000,
            padding: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
          onClick={handleMenuClick}
        >
          <p>Print the word selected</p>
        </div>
      )}
    </div>
  );
}

export default Main;
