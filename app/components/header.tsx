import React, { useState } from "react";
import { Link } from "@remix-run/react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen((prev) => {
      const newOpen = !prev;
      // メニューが開いている間、背景のスクロールを無効化
      document.body.style.overflow = newOpen ? "hidden" : "auto";
      return newOpen;
    });
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto py-4 flex justify-between items-center">
        {/* 左側：ハンバーガーとタイトル */}
        <div className="relative flex items-center space-x-4">
          <button
            onClick={handleMenuClick}
            className="flex items-center"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                // メニューオープン時：× アイコン
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // メニュークローズ時：ハンバーガーアイコン
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <h1 className="text-2xl font-bold">
            <Link to="/">たちとる</Link>
          </h1>
          {/* モバイルメニュー一覧：条件付きレンダリング */}
          {menuOpen && (
            <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg z-50">
              <nav className="p-4">
                <ul className="space-y-4">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="block text-lg hover:text-blue-500"
                        onClick={handleMenuClick}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
        {/* デスクトップナビゲーション */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="hover:text-blue-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
