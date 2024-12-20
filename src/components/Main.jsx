import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { contextMenuLookup, groqChat } from "../api/groq.js";
import Navbar from "./Navbar.js";
import ChatBubble from "./ChatBubble.jsx";
import fileicon from "../assets/fileicon.svg";

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
    <div className="flex h-screen font-montserrat">
      <div className="flex flex-grow flex-col w-[50%] ">
        {pdfFile ? (
          <>
            <div>
              <Navbar
                zoomPluginInstance={zoomPluginInstance}
                pageNavigationPluginInstance={pageNavigationPluginInstance}
                handleRemovePdf={handleRemovePdf}
              />
            </div>
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
          <div className="flex p-14 w-full h-full justify-center items-center">
            <div className="border-2 p-1 w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 rounded-2xl">
              <div className="flex h-full w-full justify-center bg-white rounded-2xl px-4 items-center back font-medium flex-col gap-1">
                <p className="font-semibold text-4xl">Upload Your File</p>
                <p className="font-extralight text-md mb-4">
                  supported type- .pdf
                </p>
                <img src={fileicon} alt="File Icon" className="w-[10%] mb-4" />
                <label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    class="text-sm text-grey-500
              file:mr-5 file:py-2 file:px-6
              file:rounded-full file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="right-panel"
        style={{ flex: 1, padding: "20px", overflow: "auto" }}
      >
        <div className="w-[100%] mx-auto h-[100%] rounded-lg flex flex-col justify-between p-1 bg-white shadow-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500">
          <div className="flex h-full w-full bg-white rounded-lg px-1 items-center back flex-col">
            <div className="flex-grow overflow-y-auto mb-4 space-y-2 w-full p-2 text-xs">
            {chatHistory.length === 0 && (
            <div className="justify-self-center self-center flex items-center justify-center text-gray-400 text-2xl">
              Ask ScireAI
            </div>
          )}
              {chatHistory.map((chat, index) => (
                <ChatBubble
                  key={index}
                  sender={chat.sender}
                  message={chat.message}
                />
              ))}
            </div>
            <div className="flex dark:bg-[#2F2F2F] justify-self-end self-end w-full rounded-lg mb-1">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none text-black"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-200 text-blue-700 p-2 rounded-r hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      {contextMenuVisible && (
        <div
          className="rounded-sm"
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
          <p className="text-sm">Ask ScireAI</p>
        </div>
      )}
    </div>
  );
}

export default Main;
