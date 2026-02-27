import { useState, useMemo } from "react";
import {
    Table as TableIcon,
    LayoutGrid,
    Search,
    ChevronLeft,
    ChevronRight,
    Play,
    Calendar,
    Clock,
    IndianRupee,
    Tag
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEnrolledCourses } from "@/api/courses";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function MyCourses() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");
    const [sortBy, setSortBy] = useState("Last Accessed");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Fetch enrolled courses specific to the logged-in learner
    const { data: coursesData, isLoading } = useQuery({
        queryKey: ["enrolled-courses"],
        queryFn: getEnrolledCourses,
    });

    // Process and enrich data
    const coursesList = useMemo(() => {
        const rawCourses = coursesData?.data?.rows || coursesData?.data || [];
        return rawCourses.map((c: any) => {
            const imageBaseUrl = import.meta.env.VITE_IMAGE_URL?.trim() || import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
            const imagePath = c.image || c.thumbnail;
            const fullImageUrl = imagePath
                ? (imagePath.startsWith('http') ? imagePath : `${imageBaseUrl}/${imagePath.replace(/^\//, '')}`)
                : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop";

            return {
                id: c._id,
                title: c.title,
                description: c.description || "-",
                category: c.category || "-",
                price: c.price ?? 0,
                startDate: c.startDate ? new Date(c.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : "-",
                startTime: c.startTime || "-",
                image: fullImageUrl,
            };
        });
    }, [coursesData]);

    // Sorting Logic
    const sortedCourses = useMemo(() => {
        let result = [...coursesList];
        if (sortBy === "Course Title") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "Progress") {
            result.sort((a, b) => b.progress - a.progress);
        }
        // "Last Accessed" is default (current order)
        return result;
    }, [coursesList, sortBy]);

    // Filtering Logic
    const filteredCourses = useMemo(() => {
        return sortedCourses.filter((course: any) => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [sortedCourses, searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const paginatedCourses = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCourses.slice(start, start + itemsPerPage);
    }, [filteredCourses, currentPage]);

    const handleAction = (course: any) => {
        navigate(`/learners/my-courses/${course.id}`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Your Campus...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 md:gap-8 animate-fade-in w-full max-w-full overflow-hidden">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 md:gap-6 min-w-0">
                <div className="space-y-1 min-w-0">
                    <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight truncate">My Enrolled Courses</h1>
                    {/* <p className="text-[11px] md:text-[13px] font-bold text-gray-400 uppercase tracking-wide truncate">Track your global medical expertise</p> */}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 md:gap-8 bg-gray-50/50 sm:bg-transparent p-2 sm:p-0 rounded-2xl border border-gray-100/50 sm:border-0 shrink-0">
                    {/* <div className="flex items-center gap-2 md:gap-3 px-3 py-1.5 sm:p-0">
                        <span className="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Sort</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-[10px] md:text-[12px] font-black text-gray-900 bg-transparent border-none outline-none cursor-pointer hover:text-primary transition-colors focus:ring-0 p-0 pr-4"
                        >
                            <option>Last Accessed</option>
                            <option>Course Title</option>
                            <option>Progress</option>
                        </select>
                    </div> */}
                    <div className="flex bg-white sm:bg-gray-100/50 p-1 rounded-xl shadow-sm sm:shadow-none border border-gray-100/50 sm:border-gray-100">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "p-1.5 md:p-2 rounded-lg transition-all",
                                viewMode === "grid" ? "bg-white shadow-md text-primary" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <LayoutGrid size={14} className="md:w-4 md:h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("table")}
                            className={cn(
                                "p-1.5 md:p-2 rounded-lg transition-all",
                                viewMode === "table" ? "bg-white shadow-md text-primary" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <TableIcon size={14} className="md:w-4 md:h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Toolbar Section */}
            {/* <div className="flex flex-col sm:flex-row items-stretch gap-3 md:gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-3.5 h-3.5" />
                    <input
                        type="text"
                        placeholder="Search programs..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-white border border-gray-100 px-10 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[12px] md:text-[13px] font-medium text-gray-700 shadow-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    />
                </div>

                <div className="relative w-full sm:w-48">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="appearance-none w-full bg-white border border-gray-100 px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[12px] md:text-[13px] font-black text-gray-700 shadow-sm outline-none cursor-pointer pr-10 hover:border-gray-200 transition-all"
                    >
                        <option>All Status</option>
                        <option>Ongoing</option>
                        <option>Completed</option>
                        <option>Not Started</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 pointer-events-none" />
                </div>
            </div> */}

            {/* Content Section */}
            {viewMode === "table" ? (
                <div className="bg-white rounded-[1rem] md:rounded-[1rem] border border-gray-100 shadow-lg shadow-gray-200/20 overflow-hidden">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left border-collapse min-w-[700px] md:min-w-[900px]">
                            <thead>
                                <tr className="border-b border-gray-50 bg-gray-50/30">
                                    <th className="px-4 md:px-6 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase">S.No</th>
                                    <th className="px-5 md:px-8 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase">Image</th>
                                    <th className="px-4 md:px-6 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase">Course Title</th>
                                    <th className="px-4 md:px-6 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase hidden md:table-cell">Description</th>
                                    <th className="px-4 md:px-6 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase hidden sm:table-cell">Category</th>
                                    <th className="px-4 md:px-6 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase">Price</th>
                                    <th className="px-4 md:px-6 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase hidden lg:table-cell">Start Date</th>
                                    <th className="px-4 md:px-6 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase hidden lg:table-cell">Start Time</th>
                                    <th className="px-5 md:px-8 py-5 md:py-6 text-[12px] font-black text-gray-400 uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50/50">
                                {paginatedCourses.length > 0 ? paginatedCourses.map((course: any, index: number) => (
                                    <tr
                                        key={course.id}
                                        onClick={() => handleAction(course)}
                                        className="group hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer"
                                    >
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <span className="text-[12px] md:text-[13px] font-bold text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</span>
                                        </td>
                                        <td className="px-5 md:px-8 py-4 md:py-5">
                                            <div className="w-9 h-7 md:w-12 md:h-10 rounded-lg md:rounded-xl overflow-hidden bg-gray-200 border border-gray-100 shadow-sm transition-transform duration-300 group-hover:scale-105">
                                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <p className="font-extrabold text-gray-900 text-[12px] md:text-[13.5px] leading-snug max-w-[160px] md:max-w-[220px] truncate">{course.title}</p>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 hidden md:table-cell">
                                            <p className="text-[11px] md:text-[12.5px] font-bold text-gray-500 max-w-[150px] truncate">{course.description}</p>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 hidden sm:table-cell">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-[10px] md:text-[11px] font-bold">
                                                <Tag size={10} />
                                                {course.category}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <span className="text-[12px] md:text-[13px] font-black text-gray-900 flex items-center gap-0.5">
                                                <IndianRupee size={12} />
                                                {course.price.toLocaleString('en-IN')}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 hidden lg:table-cell">
                                            <span className="text-[11px] md:text-[12.5px] font-bold text-gray-500 flex items-center gap-1.5">
                                                <Calendar size={12} className="text-gray-400" />
                                                {course.startDate}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 hidden lg:table-cell">
                                            <span className="text-[11px] md:text-[12.5px] font-bold text-gray-500 flex items-center gap-1.5">
                                                <Clock size={12} className="text-gray-400" />
                                                {course.startTime}
                                            </span>
                                        </td>
                                        <td className="px-5 md:px-8 py-4 md:py-5 text-right">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleAction(course); }}
                                                className="inline-flex items-center gap-1.5 px-4 md:px-6 py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-black text-[9px] md:text-[11px] uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
                                            >
                                                <Play size={10} fill="white" className="md:w-3 md:h-3" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={9} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3 text-gray-400">
                                                <Search size={32} className="md:w-10 md:h-10 mb-2 opacity-20" />
                                                <p className="font-black text-[12px] md:text-sm uppercase tracking-widest">No matching courses found</p>
                                                <button onClick={() => { setSearchQuery(""); setStatusFilter("All Status") }} className="text-primary text-[11px] md:text-[12px] font-bold hover:underline">Clear all filters</button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {paginatedCourses.map((course: any) => (
                        <div
                            key={course.id}
                            onClick={() => handleAction(course)}
                            className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/10 overflow-hidden group hover:scale-[1.02] transition-all duration-300 p-4 md:p-5 cursor-pointer flex flex-col"
                        >
                            <div className="h-36 md:h-44 rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-5 relative shrink-0">
                                <img src={course.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg md:rounded-xl shadow-sm border border-white">
                                    <span className="text-[9px] md:text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-1"><Tag size={10} />{course.category}</span>
                                </div>
                            </div>
                            <h3 className="font-black text-gray-900 text-[14px] md:text-base mb-1.5 md:mb-2 truncate px-1">{course.title}</h3>
                            <p className="text-[10px] md:text-[11px] font-medium text-gray-400 px-1 mb-2 truncate">{course.description}</p>
                            <div className="flex items-center gap-3 px-1 mb-4 text-[10px] md:text-[11px] font-bold text-gray-500">
                                <span className="flex items-center gap-1"><Calendar size={11} className="text-gray-400" />{course.startDate}</span>
                                <span className="flex items-center gap-1"><Clock size={11} className="text-gray-400" />{course.startTime}</span>
                            </div>
                            <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4 md:pt-5">
                                <span className="text-[13px] md:text-[15px] font-black text-gray-900 flex items-center gap-0.5">
                                    <IndianRupee size={14} />
                                    {course.price.toLocaleString('en-IN')}
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleAction(course); }}
                                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:rotate-12 transition-all shrink-0"
                                >
                                    <Play size={14} fill="white" className="md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex flex-col items-center justify-between gap-5 md:flex-row px-4 py-4">
                    <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase  order-2 md:order-1 text-center">
                        Page <span className="text-gray-900">{currentPage}</span> of {totalPages} — {filteredCourses.length} results
                    </p>
                    <div className="flex items-center gap-1.5 md:gap-2 order-1 md:order-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg md:rounded-xl border border-gray-100 text-gray-400 disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-50 hover:text-black transition-all active:scale-95"
                        >
                            <ChevronLeft size={14} className="md:w-4 md:h-4" />
                        </button>

                        <div className="flex items-center gap-1 md:gap-1.5">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={cn(
                                        "w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl text-[10px] md:text-[11px] font-black transition-all",
                                        currentPage === page
                                            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                                            : "bg-white border border-gray-100 text-gray-500 hover:border-primary/20 hidden sm:flex items-center justify-center"
                                    )}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg md:rounded-xl border border-gray-100 text-gray-400 disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-50 hover:text-black transition-all active:scale-95"
                        >
                            <ChevronRight size={14} className="md:w-4 md:h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
