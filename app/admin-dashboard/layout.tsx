import { Toaster } from "react-hot-toast";
import Header from "./header/page";
import Sidebar from "./sidebar/page";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 sm:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}

      <main className="flex-1 bg-gray-100 overflow-y-auto p-0">
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
