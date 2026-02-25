import { TrendingUp, Award, Clock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Enrolled Courses", value: "12", icon: PlayCircle, color: "bg-primary" },
    { label: "Hours Learned", value: "128h", icon: Clock, color: "bg-blue-500" },
    { label: "Completed Quizzes", value: "24", icon: Award, color: "bg-amber-500" },
    { label: "Success Rate", value: "92%", icon: TrendingUp, color: "bg-green-500" },
];

export default function Dashboard() {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const firstName = (user?.fullName || user?.name || "Learner").split(" ")[0];

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="space-y-3">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome back, {firstName}! 👋</h1>
                <p className="text-lg text-gray-500 font-bold">Here's what's happening with your courses today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 flex items-center gap-6 group hover:scale-[1.05] transition-all duration-300">
                        <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-12", stat.color)}>
                            <stat.icon size={32} />
                        </div>
                        <div>
                            <p className="text-[12px] uppercase tracking-[0.2em] font-black text-gray-400 mb-1.5">{stat.label}</p>
                            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
                {/* Activity Chart */}
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/40">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Learning Activity</h2>
                        <select className="text-sm font-bold text-gray-500 bg-gray-50 px-6 py-2.5 rounded-[1.25rem] border-none focus:ring-4 focus:ring-primary/5 cursor-pointer outline-none">
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="h-72 flex items-end gap-5 px-4 mb-4">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary/5 rounded-t-[1.5rem] relative group cursor-pointer h-full">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-primary group-hover:bg-primary/80 transition-all duration-700 rounded-t-[1.5rem] shadow-lg shadow-primary/20"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {h} Lessons
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Recent Certificates */}
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/40 flex flex-col">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-10">Recent Certificates</h2>
                    <div className="space-y-6 flex-1">
                        {[
                            { title: "Advanced React Patterns", date: "Dec 15, 2023" },
                            { title: "UI/UX Principles Exam", date: "Dec 01, 2023" },
                            { title: "Node.js Architecture", date: "Nov 20, 2023" },
                        ].map((cert, i) => (
                            <div key={i} className="flex items-center gap-5 p-5 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-transparent hover:border-primary/10 group cursor-pointer">
                                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 transition-colors group-hover:bg-green-100 group-hover:scale-110">
                                    <Award size={28} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-base font-black text-gray-900 truncate group-hover:text-primary transition-colors">{cert.title}</p>
                                    <p className="text-[12px] text-gray-500 font-bold mt-1">Issued on {cert.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-10 py-5 rounded-[2rem] border-2 border-dashed border-gray-100 text-gray-400 font-black text-sm uppercase tracking-widest hover:bg-gray-50 hover:border-primary/20 hover:text-primary transition-all duration-300">
                        View All Achievements
                    </button>
                </div>
            </div>
        </div>
    );
}
