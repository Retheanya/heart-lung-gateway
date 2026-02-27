import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { useEffect, useState } from "react";

export function LearnerLayout() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="h-screen w-full bg-gray-200 flex overflow-hidden font-inter text-gray-900">
            {/* Sidebar with mobile backdrop */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isCollapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
            />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[45] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Wrapper */}
            <div className="flex-1 flex flex-col h-full min-w-0 relative">
                <DashboardHeader
                    onMenuClick={() => setIsSidebarOpen(true)}
                    onSidebarToggle={() => setIsCollapsed((prev) => !prev)}
                    isSidebarCollapsed={isCollapsed}
                />

                {/* Scrollable Main Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f9fafb80]">
                    <div className="max-w-[1600px] mx-auto w-full p-2 sm:p-6 md:p-4 lg:p-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
