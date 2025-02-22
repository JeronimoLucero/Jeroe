import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black mt-auto text-white py-1 bottom-0">
      <div className="flex justify-center">
        <span>2025 © Jeroe</span>
      </div>
      <div className="flex justify-center space-x-6 mt-1">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">Instagram</a>
      </div>
    </footer>
  );
}