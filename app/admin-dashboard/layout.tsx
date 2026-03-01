import Sidebar from "./sidebar/page";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-y-auto p-8">{children}</main>
    </div>
  );
};

export default DashBoardLayout;
