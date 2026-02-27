import { useState } from "react";
import { cn } from "@/lib/utils";
import { User, Menu, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    onMenuClick: () => void;
    onSidebarToggle?: () => void;
    isSidebarCollapsed?: boolean;
}

export function DashboardHeader({ onMenuClick, onSidebarToggle, isSidebarCollapsed }: DashboardHeaderProps) {
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const navigate = useNavigate();

    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const learner = user?.learner;
    const fullName = learner?.fullName || user?.fullName || user?.name || "Learner";
    const email = learner?.email || user?.email || "";
    const firstName = fullName.split(" ")[0];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setShowLogoutDialog(false);
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <>
            <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 sticky top-0 z-40 w-full font-inter shrink-0">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button
                        onClick={() => (window.innerWidth >= 1024 ? onSidebarToggle?.() : onMenuClick())}
                        className={cn(
                            "p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all",
                            "lg:inline-flex",
                            !isSidebarCollapsed && "lg:hidden"
                        )}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex items-center gap-2 md:gap-6">
                    <div className="h-8 w-[1px] bg-gray-100 mx-1 hidden sm:block"></div>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 md:gap-3 p-1 md:p-1.5 hover:bg-gray-50 rounded-xl md:rounded-[1.25rem] transition-all border border-transparent hover:border-gray-100 group outline-none">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary shadow-sm shadow-primary/10 group-hover:scale-105 transition-transform">
                                    <User className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <p className="text-xs md:text-sm font-black text-gray-700 tracking-tight hidden xs:block">{firstName}</p>
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden xs:block" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60 p-2 rounded-xl shadow-xl border border-gray-100">
                            {/* User Info */}
                            <div className="px-3 py-3 mb-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-md shadow-primary/20 shrink-0">
                                        {fullName[0]?.toUpperCase() || 'L'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-black text-gray-900 truncate tracking-tight uppercase leading-none mb-1.5">
                                            {fullName}
                                        </p>
                                        {email && (
                                            <p className="text-[10px] text-gray-400 font-medium truncate tracking-wide leading-none">
                                                {email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 focus:text-red-600 focus:bg-red-50 gap-2"
                                onClick={() => setShowLogoutDialog(true)}
                            >
                                <LogOut size={16} />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Logout Confirmation Dialog */}
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Confirm Logout</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Are you sure you want to log out? You will need to sign in again to access your courses.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3 sm:gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setShowLogoutDialog(false)}
                            className="rounded-full px-6 font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            className="rounded-full px-6 font-semibold gap-2"
                        >
                            <LogOut size={16} />
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
