import React, { useEffect, useState } from "react";
// src/components/FloatingWhatsapp.jsx
import "../styles/FloatingWhatsapp.css"; // Ensure you have this CSS file for styles


const whatsappNumber = "+237676131512"; // Your WhatsApp number
const whatsappMessage = "Hello! I would like to know more about NeoLife products."; // Default message

function FloatingWhatsapp() {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    // Bounce every 5 seconds, animation lasts ~1s
    const interval = setInterval(() => {
      setIsBouncing(true);
      // Remove bounce class after animation duration to allow repeat
      setTimeout(() => setIsBouncing(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        whatsappMessage
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`floating-whatsapp-btn ${isBouncing ? "bounce" : ""}`}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.9 11.9 0 0012 0a11.97 11.97 0 00-10.94 17.72L0 24l6.41-1.63A11.93 11.93 0 0012 24c6.62 0 12-5.38 12-12a11.9 11.9 0 00-3.48-8.52zM12 21.54a9.5 9.5 0 01-4.83-1.42l-.35-.22-3.79.96.99-3.69-.23-.37A9.51 9.51 0 1121.5 12 9.48 9.48 0 0112 21.54zM16.32 14.64l-1.28-.6a.75.75 0 00-.88.18l-.62.77a7.57 7.57 0 01-3.7-3.7l.78-.62a.75.75 0 00.18-.88l-.6-1.28a.755.755 0 00-1-.4l-1.49.6a1.5 1.5 0 00-1 .93c-.18.64-.7 2.53 2.24 5.47s4.83 2.41 5.47 2.24a1.49 1.49 0 00.93-1l.6-1.49a.754.754 0 00-.4-1z" />
      </svg>
    </a>
  );
}

export default FloatingWhatsapp;





// // src/components/FloatingWhatsapp.jsx
// import React from "react";

// const whatsappNumber = "+237676131512"; // Replace with your WhatsApp number (with country code)
// const whatsappMessage = "Hello! I would like to know more about NeoLife products."; // Default message

// function FloatingWhatsapp() {
//   return (
//     <a
//       href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
//         whatsappMessage
//       )}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       style={{
//         position: "fixed",
//         bottom: "20px",
//         right: "20px",
//         backgroundColor: "#25D366",
//         color: "white",
//         borderRadius: "50%",
//         width: "60px",
//         height: "60px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
//         zIndex: 1000,
//         textDecoration: "none",
//       }}
//       aria-label="Chat with us on WhatsApp"
//       title="Chat with us on WhatsApp"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="32"
//         height="32"
//         fill="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path d="M20.52 3.48A11.9 11.9 0 0012 0a11.97 11.97 0 00-10.94 17.72L0 24l6.41-1.63A11.93 11.93 0 0012 24c6.62 0 12-5.38 12-12a11.9 11.9 0 00-3.48-8.52zM12 21.54a9.5 9.5 0 01-4.83-1.42l-.35-.22-3.79.96.99-3.69-.23-.37A9.51 9.51 0 1121.5 12 9.48 9.48 0 0112 21.54zM16.32 14.64l-1.28-.6a.75.75 0 00-.88.18l-.62.77a7.57 7.57 0 01-3.7-3.7l.78-.62a.75.75 0 00.18-.88l-.6-1.28a.755.755 0 00-1-.4l-1.49.6a1.5 1.5 0 00-1 .93c-.18.64-.7 2.53 2.24 5.47s4.83 2.41 5.47 2.24a1.49 1.49 0 00.93-1l.6-1.49a.754.754 0 00-.4-1z" />
//       </svg>
//     </a>
//   );
// }

// export default FloatingWhatsapp;
