import { Search, Bell, User, Menu } from "lucide-react";

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const firstName = (user?.fullName || user?.name || "Learner").split(" ")[0];

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 sticky top-0 z-40 w-full font-inter shrink-0">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="relative w-full max-w-xs md:max-w-md hidden sm:block min-w-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                    <input
                        type="text"
                        placeholder="Search your campus..."
                        className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-gray-50 border border-transparent rounded-xl md:rounded-[1.25rem] text-xs md:text-sm font-medium focus:outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
                <button className="p-2 md:p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl md:rounded-[1.25rem] transition-all relative group">
                    <Bell className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="absolute top-2 right-2 md:top-3 md:right-3 w-2 h-2 md:w-2.5 md:h-2.5 bg-primary rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-[1px] bg-gray-100 mx-1 hidden sm:block"></div>
                <button className="flex items-center gap-2 md:gap-3 p-1 md:p-1.5 md:pr-4 hover:bg-gray-50 rounded-xl md:rounded-[1.25rem] transition-all border border-transparent hover:border-gray-100 group">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary shadow-sm shadow-primary/10 group-hover:scale-105 transition-transform">
                        <User className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <p className="text-xs md:text-sm font-black text-gray-700 tracking-tight hidden xs:block">{firstName}</p>
                </button>
            </div>
        </header>
    );
}
