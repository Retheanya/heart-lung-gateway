import { useRef } from "react";
import uxiImage from "../assets/uxi.png";
import coursesHeroBg from "../assets/modern_courses_bg.png";
import {
  Award,
  Users,
  Star,
  Layout,
  MonitorPlay,
  Figma
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/api/courses";
import { Loader2 } from "lucide-react";


const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || 'https://inshltserver.kasapp.in';


const Courses = () => {
  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses
  });

  // REVERT: Show ALL courses regardless of status, as requested
  const allRows = apiResponse?.data?.rows || [];

  const courses = allRows.map((row: any) => ({
    id: row._id,
    title: row.title,
    description: row.description,
    instructor: row.chairpersons?.[0]?.name || "INSHLT Faculty",
    instructorRole: row.chairpersons?.[0]?.designation || "Expert Mentor",
    instructorImg: `https://i.pravatar.cc/150?u=${row._id}`,
    rating: 4.9,
    reviews: row.learnerCount || 0,
    badge: row.categoryName || "Professional",
    image: row.image ? `${IMAGE_BASE_URL}${row.image}` : "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?w=1200&h=800&fit=crop",
    skills: row.highlights?.map((h: string) => ({ name: h, icon: Award })) || [],
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-xl font-medium text-gray-500 animate-pulse">Loading amazing courses...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">😵‍C</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-500 max-w-md">
            We couldn't fetch the courses. Please check your internet connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO SECTION */}
        <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={coursesHeroBg}
              alt="Courses Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          {/* Large Background Text */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <h1 className="text-[15vw] font-black text-white/[0.05] tracking-tighter leading-none select-none uppercase">
              COURSES
            </h1>
          </div>

          {/* Content */}
          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
              Upgrade <span className="text-[#FFB800]">Your Skills</span> With <br className="hidden md:block" />
              Expert-Led Courses
            </h2>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute left-1/2 bottom-10 -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="w-8 h-12 rounded-full border-2 border-primary/30 flex justify-center p-1.5 backdrop-blur-sm">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* COURSES LIST SECTION */}
        <section className="bg-gray-50 py-16 lg:py-24 font-sans border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="font-sans antialiased">
              {/* Page Heading */}
              <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F3D2E] tracking-tight mb-4">
                  Explore Our Programs
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Comprehensive, professional-grade curriculum designed by industry experts to advance your medical and design career.
                </p>
              </div>

              {/* Courses Grid/Stack */}
              <div className="space-y-8 lg:space-y-12">
                {courses.length > 0 ? (
                  courses.map((course: any) => (
                    <div
                      key={course.id}
                      className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/30 border border-gray-100 transition-all duration-300 hover:shadow-gray-300/40"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr]">


                        {/* LEFT CONTENT */}
                        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 lg:order-1 relative z-10">
                          <div className="space-y-5">


                            {/* Badge & Rating Row */}
                            <div className="flex flex-wrap items-center gap-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-secondary text-xs sm:text-sm font-bold text-primary tracking-wide">
                                <Award className="w-4 h-4" strokeWidth={2.5} />
                                {course.badge}
                              </span>

                              <div className="flex items-center gap-1.5 text-amber-500">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"}`} />
                                  ))}
                                </div>
                                <span className="ml-1 text-sm font-semibold text-gray-700">
                                  {course.rating} <span className="text-gray-500 font-normal">({course.reviews} reviews)</span>
                                </span>
                              </div>
                            </div>

                            {/* Title */}
                            <div>
                              <h3 className="text-2xl sm:text-3xl font-bold text-[#0A291E] leading-tight">
                                {course.title}
                              </h3>
                            </div>


                            <div className="h-px bg-gray-100 w-full" />

                            {/* Instructor */}
                            <div className="flex items-center gap-3">
                              <img
                                src={course.instructorImg}
                                alt={course.instructor}
                                className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                              />
                              <div>
                                <p className="font-bold text-[#0A291E] text-base leading-none">
                                  {course.instructor}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {course.instructorRole}
                                </p>
                              </div>
                            </div>


                            {/* Skills heading */}
                            <div>
                              <p className="text-base font-bold text-black mb-3">
                                Skills you&apos;ll master
                              </p>


                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 font-medium">
                                {course.skills.map((skill: any, idx: number) => {
                                  const SkillIcon = skill.icon;
                                  return (
                                    <div key={idx} className="flex items-center gap-2.5">
                                      <SkillIcon className="w-5 h-5 text-primary/80" />
                                      {skill.name}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Price & CTA */}
                          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-end">

                            <Link
                              to={`/register?courseId=${course.id}`}

                              className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center"
                            >

                              Enroll Now
                            </Link>
                          </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative h-56 sm:h-64 lg:h-auto lg:min-h-[400px] order-1 lg:order-2 bg-[#F6F1E9] overflow-hidden group">

                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 lg:hidden" />
                          <img
                            src={course.image}
                            alt={course.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <p className="text-xl text-gray-500 italic">No courses available at the moment. Please check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div >
  );
};

export default Courses;
