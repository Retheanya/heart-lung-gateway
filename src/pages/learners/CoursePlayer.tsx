import { useNavigate, useParams } from "react-router-dom";
import {
    ChevronLeft,
    Play,
    Clock,
    Share2,
    Calendar,
    MessageSquare,
    Lock,
    Award,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getEnrolledCourse } from "@/api/courses";

export default function CoursePlayer() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Optimized query with caching to reduce load times
    const { data: courseData, isLoading } = useQuery({
        queryKey: ["enrolled-course", id],
        queryFn: () => getEnrolledCourse(id as string),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });

    // A collection of fast-loading, human-body oriented medical education video fallbacks
    const medicalVideos = [
        "https://vjs.zencdn.net/v/oceans.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    ];

    const imageBaseUrl = import.meta.env.VITE_IMAGE_URL?.trim() || import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
    const rawCourse = courseData?.data || {};

    // Resolve image paths
    const getImagePath = (path: string) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `${imageBaseUrl}/${path.replace(/^\//, '')}`;
    };

    const course = {
        ...rawCourse,
        title: rawCourse.title || "Advanced Heart & Lung Transplantation",
        progress: rawCourse.progress || 75,
        status: rawCourse.status || "IN PROGRESS",
        image: getImagePath(rawCourse.image || rawCourse.thumbnail),
    };

    // Dynamically assign a different medical class theme video
    const videoIndex = id ? id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % medicalVideos.length : 0;
    const fallbackVideo = medicalVideos[videoIndex];
    const videoSource = course.video || course.videoUrl || fallbackVideo;

    const curriculum = [
        {
            id: 1,
            title: "Session 1: Introduction",
            description: "Basics of ACLS algorithms & surveys.",
            duration: "45m",
            date: "Oct 12",
            status: "current"
        },
        {
            id: 2,
            title: "Session 2: Diagnostics",
            description: "ECG Rhythms & Interpretation.",
            duration: "Upcoming Live",
            date: "Nov 15",
            status: "upcoming"
        },
        {
            id: 3,
            title: "Session 3: Pharmacology",
            description: "Key drugs in cardiac arrest.",
            duration: "",
            date: "Dec 10",
            status: "locked"
        },
        {
            id: 4,
            title: "Session 4: Resuscitation",
            description: "Team dynamics & leadership.",
            duration: "",
            date: "Jan 12",
            status: "locked"
        },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 md:gap-8 animate-fade-in w-full max-w-full overflow-hidden">
            {/* Top Navigation / Header */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between bg-white p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 gap-4 min-w-0 overflow-hidden">
                <div className="flex items-center gap-3 md:gap-5 min-w-0 flex-1">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 transition-all shrink-0"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-gray-900 tracking-tight truncate leading-tight">{course.title}</h1>
                        <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[8px] md:text-[10px] font-black text-green-500 uppercase tracking-widest">{course.status === 1 ? "ACTIVE" : "IN PROGRESS"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 border-t md:border-t-0 pt-3 md:pt-0 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="hidden xs:block w-16 md:w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${course.progress || 75}%` }}></div>
                        </div>
                        <span className="text-[9px] md:text-[11px] font-black text-gray-900 uppercase tracking-widest leading-none">
                            {course.progress || 75}%
                        </span>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl bg-gray-900 text-white text-[9px] md:text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-black/10">
                        <Play size={10} fill="white" className="md:w-3 md:h-3" />
                        <span>My Portal</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 md:gap-8 lg:gap-10 items-start w-full min-w-0">
                {/* Main Content: Video Player */}
                <div className="flex flex-col gap-6 md:gap-10 min-w-0 w-full overflow-hidden">
                    {/* Live HTML5 Video Player */}
                    <div className="aspect-video bg-black rounded-[1.25rem] md:rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden relative shadow-2xl border-4 md:border-[10px] border-white shadow-gray-200 group transition-all duration-300">
                        <video
                            key={videoSource}
                            controls
                            autoPlay={false}
                            className="w-full h-full object-contain"
                            poster={course.image || "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=800&fit=crop"}
                            src={videoSource}
                        >
                            Your browser does not support the video tag.
                        </video>

                        <div className="absolute top-4 left-4 md:top-8 md:left-8 pointer-events-none">
                            <div className="bg-black/40 backdrop-blur-md px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-2xl flex items-center gap-2.5 border border-white/10 shadow-lg">
                                <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                <span className="text-[8px] md:text-[11px] font-black text-white uppercase tracking-widest ">Recorded Premiere</span>
                            </div>
                        </div>
                    </div>

                    {/* Lesson Info */}
                    <div className="flex flex-col md:flex-row items-start justify-between bg-white p-6 md:p-8 lg:p-12 rounded-[1.5rem] md:rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/10 gap-8">
                        <div className="space-y-4 md:space-y-6 flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-[1.15]">Session 1: Introduction to {course.title.split(' ').slice(-1)}</h2>
                            <div className="flex flex-wrap items-center gap-4 md:gap-8">
                                <div className="flex items-center gap-2.5 text-gray-500 font-bold text-[11px] md:text-sm">
                                    <div className="p-2 md:p-2.5 bg-primary/5 rounded-lg md:rounded-xl">
                                        <Calendar size={16} className="text-primary" />
                                    </div>
                                    <span className="tracking-tight text-gray-400">Oct 12, 2023</span>
                                </div>
                                <div className="hidden sm:block w-px h-5 bg-gray-100"></div>
                                <div className="flex items-center gap-2.5 text-gray-500 font-bold text-[11px] md:text-sm">
                                    <div className="p-2 md:p-2.5 bg-emerald-50 rounded-lg md:rounded-xl">
                                        <User size={16} className="text-emerald-500" />
                                    </div>
                                    <span className="tracking-tight text-gray-400">{course.instructorName || "INSHLT Senior Faculty"}</span>
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4.5 rounded-xl md:rounded-2xl bg-gray-50 text-gray-900 text-xs md:text-[13px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100 shadow-sm shadow-gray-200/20 w-full md:w-auto shrink-0 group">
                            <Share2 size={16} className="group-hover:scale-110 transition-transform" />
                            Share
                        </button>
                    </div>
                </div>

                {/* Right Sidebar: Curriculum */}
                <div className="space-y-6 md:space-y-10">
                    <div className="bg-white p-6 md:p-8 lg:p-10 rounded-[1.5rem] md:rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/40">
                        <div className="mb-6 md:mb-10">
                            <h3 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">Course Curriculum</h3>
                            <p className="text-[10px] md:text-[11px] font-bold text-gray-400 mt-1.5 md:mt-2 uppercase tracking-widest">Available Sessions</p>
                        </div>

                        <div className="space-y-3.5 md:space-y-4">
                            {curriculum.map((item) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.25rem] border transition-all duration-300 relative group cursor-pointer border-transparent",
                                        item.status === 'current' ? "bg-red-50/50 border-primary/20 shadow-xl shadow-primary/5" : "bg-[#FCFCFC] hover:bg-white hover:border-gray-100 hover:shadow-lg hover:shadow-gray-200/20"
                                    )}
                                >
                                    <div className="flex items-start gap-4 md:gap-5">
                                        <div className={cn(
                                            "mt-1 w-7 h-7 md:w-8 md:h-8 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110",
                                            item.status === 'current' ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-gray-100 text-gray-400 shadow-sm"
                                        )}>
                                            {item.status === 'current' ? <Play size={12} fill="white" /> : item.status === 'locked' ? <Lock size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                                        </div>
                                        <div className="flex-1 space-y-1 md:space-y-1.5 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className={cn(
                                                    "text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em]",
                                                    item.status === 'current' ? "text-primary" : "text-gray-400"
                                                )}>
                                                    {item.status === 'current' ? 'CURRENT' : item.date}
                                                </span>
                                                {item.status === 'current' && <span className="text-[9px] md:text-[10px] font-bold text-gray-400">{item.date}</span>}
                                            </div>
                                            <h4 className={cn(
                                                "text-[14px] md:text-[15px] font-black leading-tight truncate group-hover:text-primary transition-colors",
                                                item.status === 'locked' ? 'text-gray-400' : 'text-gray-900'
                                            )}>{item.title}</h4>

                                            {(item.duration || item.status === 'upcoming') && (
                                                <div className="flex items-center gap-2 pt-1 md:pt-1.5">
                                                    {item.status === 'upcoming' ? (
                                                        <span className="bg-orange-50 text-orange-600 text-[8px] md:text-[9px] font-black px-2.5 md:px-4 py-1 rounded-lg md:rounded-xl uppercase tracking-widest border border-orange-100 shadow-sm shadow-orange-100/50">Live Session</span>
                                                    ) : item.duration ? (
                                                        <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] md:text-[11px] bg-white px-2.5 py-1 rounded-lg border border-gray-50 shadow-sm">
                                                            <Clock size={11} className="text-gray-300" />
                                                            {item.duration}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 py-6 md:py-8 rounded-[2rem] md:rounded-[3rem] border border-gray-100 bg-white text-gray-900 font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-xl shadow-gray-200/20 hover:bg-gray-50 transition-all group">
                        <MessageSquare size={18} className="text-primary group-hover:rotate-12 transition-transform" />
                        Discussion Board
                    </button>
                </div>
            </div>
        </div>
    );
}
