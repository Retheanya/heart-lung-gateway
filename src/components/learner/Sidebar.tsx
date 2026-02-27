import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    X,
    Menu
} from "lucide-react";
import logo from "@/assets/logo.png";
import fav from "@/assets/fav.png";

const menuItems = [
    // { icon: LayoutDashboard, label: "Dashboard", path: "/learners/dashboard" },
    { icon: BookOpen, label: "My Courses", path: "/learners/my-courses" },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

export function Sidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
    const { pathname } = useLocation();

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-[50] bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:shadow-none",
            "w-64",
            isCollapsed ? "lg:w-20" : "lg:w-64",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Top Section - Logo + Hamburger toggle */}
            <div className={cn(
                "h-16 border-b border-gray-100 flex items-center shrink-0 transition-all duration-300",
                isCollapsed ? "justify-center" : "justify-between flex-row"
            )}>
                <Link to="/" className={cn(
                    "flex items-center group shrink-0",
                    isCollapsed && "justify-center w-full"
                )}>
                    <img
                        src={isCollapsed ? fav : logo}
                        alt="INSHLT Logo"
                        className={cn(
                            "transition-all duration-500 group-hover:scale-105 object-contain",
                            isCollapsed ? "h-9 w-9" : "h-8 w-auto"
                        )}
                    />
                </Link>
                {!isCollapsed && (
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => {
                                if (window.innerWidth >= 1024) onToggleCollapse?.();
                                else onClose();
                            }}
                            className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            aria-label="Collapse sidebar"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Menu Section */}
            <div className={cn(
                "flex-1 overflow-y-auto transition-all duration-300",
                isCollapsed ? "px-2 py-6" : "px-3 py-8"
            )}>
                {/* {!isCollapsed && (
                    <p className="text-[9px] font-black text-gray-400 px-4 mb-6">
                        Main Menu
                    </p>
                )} */}
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path || pathname.startsWith(item.path + '/') || (item.path === "/learners/dashboard" && pathname === "/learners");
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                title={isCollapsed ? item.label : undefined}
                                className={cn(
                                    "flex items-center rounded-2xl text-[12.5px] font-bold transition-all duration-300",
                                    isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                                    isActive
                                        ? "bg-primary text-white shadow-xl shadow-primary/25"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-white" : "text-gray-400")} strokeWidth={2.5} />
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
