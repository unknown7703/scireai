import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import ReactMarkdown from 'react-markdown';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './App.css';
import { contextMenuLookup } from './api/groq.js';
import Navbar from './Navbar.js';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [tempSelectedText, setTempSelectedText] = useState('');
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfFile(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const selectedText = window.getSelection().toString();
    setTempSelectedText(selectedText);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const handleMenuClick = async () => {
    setContextMenuVisible(false);
    try {
      const response = await contextMenuLookup(tempSelectedText);
      const result = response.choices[0]?.message?.content || "No response";
      console.log("contextMenuLookup result:", result);
      setSelectedText(result);
    } catch (error) {
      console.error("Error in fetching data:", error);
      setSelectedText("Error in fetching data");
    }
  };

  useEffect(() => {
    document.addEventListener('click', () => setContextMenuVisible(false));
    return () => {
      document.removeEventListener('click', () => setContextMenuVisible(false));
    };
  }, []);

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh' }}>
      <div className="left-panel" style={{ flex: 3, display: 'flex', flexDirection: 'column', borderRight: '1px solid #ccc' }}>
        {pdfFile ? (
          <>
            <Navbar
              zoomPluginInstance={zoomPluginInstance}
              pageNavigationPluginInstance={pageNavigationPluginInstance}
              handleRemovePdf={handleRemovePdf}
            />
            <div style={{ flex: 1, overflow: 'auto' }} onContextMenu={handleContextMenu}>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfFile} plugins={[zoomPluginInstance, pageNavigationPluginInstance]} />
              </Worker>
            </div>
          </>
        ) : (
          <div style={{ padding: '20px' }}>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-4"
            />
          </div>
        )}
      </div>
      <div className="right-panel" style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <div className="mt-4" style={{ height: 'calc(100% - 100px)', overflow: 'auto' }}>
          <ReactMarkdown className="text-sm text-justify markdown">{selectedText}</ReactMarkdown>
        </div>
      </div>
      {contextMenuVisible && (
        <div
          className="context-menu"
          style={{
            position: 'absolute',
            top: `${contextMenuPosition.y}px`,
            left: `${contextMenuPosition.x}px`,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            zIndex: 1000,
            padding: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
          onClick={handleMenuClick}
        >
          <p>Print the word selected</p>
        </div>
      )}
    </div>
  );
}

export default App;