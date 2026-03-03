import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ChevronLeft,
    Play,
    Clock,
    Calendar,
    ChevronDown,
    ChevronUp,
    FileText,
    Download,
    Tag,
    IndianRupee,
    Star,
    BookOpen,
    Users,
    Video,
    HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getEnrolledCourse } from "@/api/courses";
import { motion } from "framer-motion";

export default function CoursePlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
    const [showAllModules, setShowAllModules] = useState(false);

    const { data: courseData, isLoading } = useQuery({
        queryKey: ["enrolled-course", id],
        queryFn: () => getEnrolledCourse(id as string),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    const imageBaseUrl = import.meta.env.VITE_IMAGE_URL?.trim() || import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
    const course = courseData?.data || {};

    const resolvePath = (path: string | undefined) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `${imageBaseUrl}/${path.replace(/^\//, '')}`;
    };

    const modules = course.modules || [];
    const faqs = course.faqs || [];
    const highlights = course.highlights || [];
    const activeModule = modules[activeModuleIndex];

    // Determine the video source: active module's session video or course intro video
    const videoSource = resolvePath(activeModule?.sessionVideo) || resolvePath(course.introVideo);
    const posterImage = resolvePath(course.image);

    const formattedStartDate = course.startDate
        ? new Date(course.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : "-";

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading Course...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 md:gap-8 animate-fade-in w-full max-w-full overflow-hidden">
            {/* Top Navigation / Header */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between bg-white p-4 sm:p-5 md:p-6 rounded-lg md:rounded-[1rem] border border-gray-100 shadow-xl shadow-gray-200/20 gap-4 min-w-0 overflow-hidden">
                <div className="flex items-center gap-3 md:gap-5 min-w-0 flex-1">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 transition-all shrink-0"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-sm sm:text-base md:text-md lg:text-md font-black text-gray-900 truncate capitalize">{course.title || "Course"}</h1>
                        <div className="flex items-center gap-3 mt-1">
                            {course.category && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-primary/5 text-primary text-[9px] md:text-[10px] font-bold">
                                    <Tag size={10} />
                                    {course.category}
                                </span>
                            )}
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] md:text-[11px] font-bold text-green-600 tracking-tight">
                                    {course.status === 1 ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6 border-t md:border-t-0 pt-3 md:pt-0 shrink-0 flex-wrap">
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] md:text-xs font-bold">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{formattedStartDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] md:text-xs font-bold">
                        <Clock size={14} className="text-gray-400" />
                        <span>{course.startTime || "-"}</span>
                    </div>
                    {/* <div className="flex items-center gap-1 text-gray-900 text-sm md:text-base font-black">
                        <IndianRupee size={16} />
                        <span>{(course.price ?? 0).toLocaleString('en-IN')}</span>
                    </div> */}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 md:gap-4 lg:gap-4 items-start w-full min-w-0">
                {/* Main Content */}
                <div className="flex flex-col gap-6 md:gap-8 min-w-0 w-full overflow-hidden">
                    {/* Video Player */}
                    <div className="aspect-video bg-black rounded-[1.25rem] md:rounded-[1rem] overflow-hidden relative shadow-2xl border-4 md:border-[8px] border-white shadow-gray-200 group transition-all duration-300">
                        {videoSource ? (
                            <video
                                key={videoSource}
                                controls
                                controlsList="nodownload"
                                autoPlay={false}
                                className="w-full h-full object-contain"
                                poster={posterImage || undefined}
                                src={videoSource}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                <div className="text-center">
                                    <Video size={48} className="text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-500 text-sm font-bold">No video available</p>
                                </div>
                            </div>
                        )}

                        {activeModule && (
                            <div className="absolute top-4 left-4 md:top-6 md:left-6 pointer-events-none">
                                <div className="bg-black/40 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl flex items-center gap-2 border border-white/10 shadow-lg">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    <span className="text-[10px] md:text-[11px] font-bold text-white tracking-tight">
                                        Module {activeModule.number || activeModuleIndex + 1}: {activeModule.title}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Course Info */}
                    <div className="bg-white p-5 md:p-8 rounded-[1.25rem] md:rounded-[1rem] border border-gray-100 shadow-xl shadow-gray-200/10">
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-sm md:text-lg font-black text-gray-900 mb-2">{course.title}</h2>
                                {course.description && (
                                    <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{course.description}</p>
                                )}
                            </div>

                            {/* Stats Row */}
                            <div className="flex flex-wrap items-center gap-3 md:gap-5">
                                {course.totalModules !== undefined && (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-xl">
                                        <BookOpen size={14} className="text-primary" />
                                        <span className="text-[11px] md:text-xs font-bold text-gray-700">{course.totalModules} Module{course.totalModules !== 1 ? 's' : ''}</span>
                                    </div>
                                )}
                                {course.totalFaqs !== undefined && (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-xl">
                                        <HelpCircle size={14} className="text-amber-500" />
                                        <span className="text-[11px] md:text-xs font-bold text-gray-700">{course.totalFaqs} FAQ{course.totalFaqs !== 1 ? 's' : ''}</span>
                                    </div>
                                )}
                            </div>

                            {/* Highlights */}
                            {highlights.length > 0 && (
                                <div>
                                    <h3 className="text-[13px] md:text-[15px] font-bold text-red-600 tracking-tight mb-3">Highlights</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {highlights.map((highlight: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                                                <Star size={12} className="text-emerald-500 shrink-0" />
                                                <span className="text-[11px] md:text-xs font-semibold text-emerald-700">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PDF Resources (for active module) */}
                    {activeModule?.pdfUploads && activeModule.pdfUploads.length > 0 && (
                        <div className="bg-white p-5 md:p-8 rounded-[1.25rem] md:rounded-[1rem] border border-gray-100 shadow-xl shadow-gray-200/10">
                            <h3 className="text-sm md:text-base font-black text-gray-900 tracking-tight mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-primary" />
                                Resources — {activeModule.title}
                            </h3>
                            <div className="space-y-2.5">
                                {activeModule.pdfUploads.map((pdf: any) => (
                                    <a
                                        key={pdf._id}
                                        href={resolvePath(pdf.pdfUrl) || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3.5 md:p-4 bg-gray-50 hover:bg-primary/5 rounded-xl border border-gray-100 hover:border-primary/20 transition-all group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                                <FileText size={16} className="text-red-500" />
                                            </div>
                                            <span className="text-xs md:text-sm font-bold text-gray-700 truncate group-hover:text-primary transition-colors">{pdf.pdfName}</span>
                                        </div>
                                        <Download size={16} className="text-gray-400 group-hover:text-primary transition-colors shrink-0 ml-3" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQs */}
                    {faqs.length > 0 && (
                        <div className="bg-white p-5 md:p-8 rounded-[1.25rem] md:rounded-[1rem] border border-gray-100 shadow-xl shadow-gray-200/10">
                            <h3 className="text-sm md:text-base font-black text-gray-900 tracking-tight mb-5 flex items-center gap-2">
                                <HelpCircle size={18} className="text-amber-500" />
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-3">
                                {faqs.map((faq: any, index: number) => (
                                    <div
                                        key={faq._id || index}
                                        className="border border-gray-100 rounded-xl overflow-hidden transition-all"
                                    >
                                        <button
                                            onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50/50 transition-colors"
                                        >
                                            <span className="text-xs md:text-sm font-bold text-gray-800 pr-4">{faq.question}</span>
                                            {expandedFaqIndex === index ? (
                                                <ChevronUp size={16} className="text-gray-400 shrink-0" />
                                            ) : (
                                                <ChevronDown size={16} className="text-gray-400 shrink-0" />
                                            )}
                                        </button>
                                        {expandedFaqIndex === index && (
                                            <div className="px-4 md:px-5 pb-4 md:pb-5">
                                                <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar: Modules & SubModules */}
                <div className="space-y-6">
                    <div className="bg-white p-5 md:p-6 rounded-[1.25rem] md:rounded-[1rem] border border-gray-100 shadow-2xl shadow-gray-200/40">
                        <div className="mb-5 md:mb-6">
                            <h3 className="text-base md:text-lg font-black text-gray-900 tracking-tight">Course Modules</h3>
                            <p className="text-[10px] md:text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                                {modules.length} Module{modules.length !== 1 ? 's' : ''} Available
                            </p>
                        </div>

                        <div className="space-y-3">
                            {(showAllModules ? modules : modules.slice(0, 5)).map((module: any, mIndex: number) => (
                                <div key={module._id || mIndex}>
                                    {/* Module Header */}
                                    <button
                                        onClick={() => setActiveModuleIndex(mIndex)}
                                        className={cn(
                                            "w-full p-4 rounded-xl border transition-all duration-300 text-left",
                                            activeModuleIndex === mIndex
                                                ? "bg-primary/5 border-primary/20 shadow-lg shadow-primary/5"
                                                : "bg-gray-50/50 border-transparent hover:bg-white hover:border-gray-100 hover:shadow-md"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black",
                                                activeModuleIndex === mIndex
                                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                                    : "bg-white border border-gray-200 text-gray-500"
                                            )}>
                                                {module.number || String(mIndex + 1).padStart(2, '0')}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className={cn(
                                                    "text-[13px] md:text-sm font-black truncate",
                                                    activeModuleIndex === mIndex ? "text-primary" : "text-gray-800"
                                                )}>{module.title}</h4>
                                                <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                                                    {module.subModules?.length || 0} sub-module{(module.subModules?.length || 0) !== 1 ? 's' : ''}
                                                    {module.pdfUploads?.length ? ` · ${module.pdfUploads.length} PDF${module.pdfUploads.length !== 1 ? 's' : ''}` : ''}
                                                </p>
                                            </div>

                                        </div>
                                    </button>

                                    {/* SubModules (expanded for active module) */}
                                    {activeModuleIndex === mIndex && module.subModules && module.subModules.length > 0 && (
                                        <div className="ml-5 mt-2 space-y-1.5 border-l-2 border-primary/10 pl-4">
                                            {module.subModules.map((sub: any, sIndex: number) => (
                                                <div
                                                    key={sub._id || sIndex}
                                                    className="p-3 rounded-lg bg-gray-50/50 hover:bg-primary/5 transition-colors"
                                                >
                                                    <div className="flex items-start gap-2.5">
                                                        <div className="w-5 h-5 rounded-md bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                                                            <span className="text-[8px] font-black text-gray-400">{sIndex + 1}</span>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h5 className="text-[11px] md:text-xs font-bold text-gray-700 leading-snug">{sub.title}</h5>
                                                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                                                {sub.time && (
                                                                    <span className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                                                                        <Clock size={9} />
                                                                        {sub.time}
                                                                    </span>
                                                                )}
                                                                {sub.leads && sub.leads.length > 0 && (
                                                                    <span className="flex items-center gap-1 text-[9px] font-bold text-primary/70">
                                                                        <Users size={9} />
                                                                        {sub.leads.map((l: any) => l.lead).join(', ')}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {modules.length > 5 && (
                                <button
                                    onClick={() => setShowAllModules(!showAllModules)}
                                    className="w-full py-3 text-center text-xs font-black text-primary uppercase tracking-widest hover:bg-primary/5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                                >
                                    {showAllModules ? (
                                        <>Show Less <ChevronUp size={14} /></>
                                    ) : (
                                        <>Show All {modules.length} Modules <ChevronDown size={14} /></>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}