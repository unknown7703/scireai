import React, { useState, useEffect ,useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { contextMenuLookup, groqChat } from "../api/groq.js";
import Navbar from "./Navbar.js";
import ChatBubble from "./ChatBubble.jsx";
import fileicon from "../assets/fileicon.svg";
//import { Link } from "react-router-dom";


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
  const chatRef = useRef(null);
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
    setChatHistory([]);
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
    console.log(chatHistory);
  };
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };
  //USER INPUT
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };


  
  const handleSendMessage = async () => {
    try {
      const response = await groqChat(userInput);
      addMessageToChatHistory("user", userInput);
      const result = response.choices[0]?.message?.content || "No response";
      addMessageToChatHistory("bot", result);
      setUserInput("");
    } catch (error) {
      console.error("Error in fetching data:", error);
      addMessageToChatHistory("bot", "Error in fetching data");
    } 
  };
  
  
  const renderUserSelect = () => {
    addMessageToChatHistory("user", tempSelectedText);
    
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
  
  useEffect(() => {
    if (chatHistory.length > 0) {
      const latestChat = chatHistory[chatHistory.length - 1];
      if (latestChat.sender === "user") {
        scrollToBottom();
      }
    }
  }, [chatHistory]);

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
          <div className="flex p-4 w-full h-full justify-center items-center">
           
              <div className="flex h-full w-full justify-center border-4 border-blue-500 bg-white rounded-2xl px-4 items-center back font-medium flex-col gap-1">
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
                {/* <div className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full mt-6"><Link to="/">Home</Link></div> */}
              
            </div>
          </div>
        )}
      </div>
      <div
        className="right-panel"
        style={{ flex: 1, padding: "20px", overflow: "auto" }}
      >
          <div className="flex h-full w-full bg-white border-4 border-blue-500 rounded-2xl px-1 items-center back flex-col">
            <div  ref={chatRef} className="flex-grow overflow-y-auto mb-4 space-y-2 w-full p-2 text-xs">
            {chatHistory.length === 0 && (
            <div className="justify-self-center self-center flex items-center justify-center mt-20 text-gray-400 text-2xl">
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
            <div className="flex  justify-self-end self-end w-full rounded-3xl mb-2 ">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type Your Queries..."
                className="flex-grow p-2 border border-gray-300 rounded-l-xl focus:outline-none text-black"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-200 text-blue-700 p-2 rounded-r-xl hover:bg-blue-600 hover:text-white transition-colors"
              >
                Send
              </button>
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
          onClick={()=>{handleMenuClick();renderUserSelect();}}
        >
          <p className="text-sm">Ask ScireAI</p>
        </div>
      )}
    </div>
  );
}

export default Main;
