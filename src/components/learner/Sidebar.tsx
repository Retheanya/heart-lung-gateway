import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BookOpen,
    LogOut,
    X
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const menuItems = [
    // { icon: LayoutDashboard, label: "Dashboard", path: "/learners/dashboard" },
    { icon: BookOpen, label: "My Courses", path: "/learners/my-courses" },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // Get user data from localStorage
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    // Logic to get the registered user's name
    const fullName = user?.fullName || user?.name || user?.userName || (user?.email ? user.email.split('@')[0] : "Learner");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-[50] w-64 bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:shadow-none",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Top Section */}
            <div className="h-20 px-6 border-b border-gray-100 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3.5 group">
                    <img
                        src={logo}
                        alt="INSHLT Logo"
                        className="h-10 w-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="flex flex-col">
                        <span className="text-[13px] font-black text-gray-900 tracking-tighter leading-none whitespace-nowrap">INSHLT</span>
                        <span className="text-[8px] font-black text-primary uppercase tracking-[0.15em] mt-1.5 leading-none">LMS Portal</span>
                    </div>
                </Link>
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Menu Section */}
            <div className="flex-1 px-3 py-8 overflow-y-auto">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.25em] px-4 mb-6">
                    Main Menu
                </p>
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path || (item.path === "/learners/dashboard" && pathname === "/learners");
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-[12.5px] font-bold transition-all duration-300",
                                    isActive
                                        ? "bg-primary text-white shadow-xl shadow-primary/25"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn("w-4.5 h-4.5", isActive ? "text-white" : "text-gray-400")} strokeWidth={2.5} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer Section: User Info and Logout */}
            <div className="p-4 space-y-3 mt-auto border-t border-gray-50">
                <div className="bg-[#fcfcfc] rounded-[1.25rem] p-3 flex items-center gap-3 border border-gray-100">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xs shadow-md shadow-primary/20">
                        {fullName[0]?.toUpperCase() || 'L'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11.5px] font-black text-gray-900 truncate tracking-tight uppercase leading-none mb-1.5">
                            {fullName}
                        </p>
                        <p className="text-[9px] text-gray-400 font-bold truncate tracking-wide uppercase leading-none">
                            Registered Member
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group"
                >
                    <LogOut className="w-4.5 h-4.5 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
