"use client";

import { Search, Bell, MessageSquare, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#231442] to-[#231442] border-b border-[#231442] backdrop-blur-sm px-4 sm:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Search */}
        <div className="flex-1 min-w-0">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-3 text-purple-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search something here"
              className="w-full bg-purple-800/30 border border-purple-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Right: Icons & Profile */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Notifications */}
          <button className="text-purple-300 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              5
            </span>
          </button>

          {/* Messages */}
          <button className="text-purple-300 hover:text-white transition-colors">
            <MessageSquare size={20} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-6 border-l border-purple-700 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex-shrink-0" />
            <div className="hidden sm:flex flex-col text-sm min-w-0 truncate">
              <p className="text-white font-medium truncate">Oda Dirk</p>
              <p className="text-purple-400 text-xs truncate">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
