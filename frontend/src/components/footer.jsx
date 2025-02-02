import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white mt-auto text-black py-1 bottom-0">
      <div className="flex justify-center">
        <span>2025 © Jeroe</span>
      </div>
      <div className="flex justify-center space-x-6 mt-1">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black">Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black">Instagram</a>
      </div>
    </footer>
  );
}