import React, { useEffect, useRef } from 'react';

const OngoingMeeting = ({users, iframeLink, role}) => {
    const iframeRef = useRef(null);
    const logContainerRef = useRef(null);

    const log = (message) => {
        const logContainer = logContainerRef.current;
        if (logContainer) {
            const logEntry = document.createElement('p');
            logEntry.textContent = `${new Date().toISOString()}: ${message}`;
            logContainer.appendChild(logEntry);
            console.log(message);
        }
    };

    useEffect(() => {
        log('OngoingMeeting component loaded. Starting iframe monitoring...');

        const iframe = iframeRef.current;

        if (iframe) {
            iframe.onload = () => {
                log('Iframe loaded');
                iframe.contentWindow.postMessage('Hello from parent', '*');
            };
        }

        const messageListener = (event) => {
            if (event.origin !== "https://testing--inspiring-cendol-60afd6.netlify.app") return;
            log(`Received message from iframe: ${JSON.stringify(event.data)}`);
        };

        window.addEventListener('message', messageListener);

        const pingInterval = setInterval(() => {
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage('Ping from parent', '*');
            }
        }, 5000);

        const networkStatusInterval = setInterval(() => {
            log(`Network status: ${navigator.onLine ? 'online' : 'offline'}`);
        }, 10000);

        const errorListener = (event) => {
            log(`Global error: ${event.message} at ${event.filename}:${event.lineno}`);
        };

        window.addEventListener('error', errorListener);

        log('Monitoring setup complete');

        return () => {
            clearInterval(pingInterval);
            clearInterval(networkStatusInterval);
            window.removeEventListener('message', messageListener);
            window.removeEventListener('error', errorListener);
        };
    }, []);

    return (
        <div>
            {/* <h1>WebRTC Viewer Integration with postMessage</h1> */}
            <div className="iframe-container" style={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}>
                <iframe
                    ref={iframeRef}
                    src={iframeLink}
                    allow="autoplay; fullscreen; microphone; camera"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allowFullScreen
                ></iframe>
            </div>
            {/* <div ref={logContainerRef} id="log-container" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', height: '200px', overflowY: 'scroll', display: 'none'}}></div> */}
        </div>
    );
};

export default OngoingMeeting;
