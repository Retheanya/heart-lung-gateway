import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { useEffect, useState } from "react";

export function LearnerLayout() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="h-screen w-full bg-[#FDFCFB] flex overflow-hidden font-inter text-gray-900">
            {/* Sidebar with mobile backdrop */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[45] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Wrapper */}
            <div className="flex-1 flex flex-col h-full min-w-0 relative">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Scrollable Main Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#FDFCFB]">
                    <div className="max-w-[1600px] mx-auto w-full p-4 sm:p-6 md:p-8 lg:p-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
