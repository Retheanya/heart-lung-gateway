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

const coursesData = [
  {
    id: 1,
    title: "Master UI/UX Design From Scratch",
    instructor: "Emma Harrison",
    instructorRole: "Senior Product Designer @ Google",
    instructorImg: "https://i.pravatar.cc/150?u=emma",
    rating: 4.9,
    reviews: "6,234",
    badge: "Top Rated",
    image: uxiImage,
    skills: [
      { name: "User research & personas", icon: Users },
      { name: "Figma & Sketch mastery", icon: Figma },
      { name: "Interactive prototyping", icon: MonitorPlay },
      { name: "Design systems", icon: Layout },
    ],
  },
  {
    id: 2,
    title: "Advanced Heart Transplant Protocols",
    instructor: "Dr. Robert Chen",
    instructorRole: "Chief of Cardiology @ Mayo Clinic",
    instructorImg: "https://i.pravatar.cc/150?u=robert",
    rating: 4.8,
    reviews: "1,102",
    badge: "Specialized",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    skills: [
      { name: "Surgical terminology", icon: Award },
      { name: "Patient care standards", icon: Users },
      { name: "Organ preservation", icon: MonitorPlay },
      { name: "Post-op monitoring", icon: Layout },
    ],
  },
  {
    id: 3,
    title: "Cardiac Life Support Mastery",
    instructor: "Sarah Williams",
    instructorRole: "ER Specialist & Clinical Lead",
    instructorImg: "https://i.pravatar.cc/150?u=sarah",
    rating: 5.0,
    reviews: "3,890",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
    skills: [
      { name: "Emergency response", icon: MonitorPlay },
      { name: "ECG interpretation", icon: Award },
      { name: "Crisis management", icon: Users },
      { name: "Life saving techniques", icon: Layout },
    ],
  },
];

const Courses = () => {
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
              <div className="space-y-12 lg:space-y-20">
                {coursesData.map((course) => (
                  <div
                    key={course.id}
                    className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/40 border border-gray-100 ring-1 ring-gray-100/50 transition-all duration-300 hover:shadow-gray-300/50"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">

                      {/* LEFT CONTENT */}
                      <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between order-2 lg:order-1 relative z-10">
                        <div className="space-y-8">

                          {/* Badge & Rating Row */}
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-secondary text-xs sm:text-sm font-bold text-primary tracking-wide uppercase">
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
                            <h3 className="text-3xl sm:text-4xl font-bold text-[#0A291E] leading-tight">
                              {course.title}
                            </h3>
                          </div>

                          <div className="h-px bg-gray-100 w-full" />

                          {/* Instructor */}
                          <div className="flex items-center gap-4">
                            <img
                              src={course.instructorImg}
                              alt={course.instructor}
                              className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm"
                            />
                            <div>
                              <p className="font-bold text-[#0A291E] text-lg leading-none">
                                {course.instructor}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {course.instructorRole}
                              </p>
                            </div>
                          </div>

                          {/* Skills heading */}
                          <div>
                            <p className="text-lg font-bold text-black mb-4">
                              Skills you&apos;ll master
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 font-medium">
                              {course.skills.map((skill, idx) => {
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
                        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end">
                          <Link
                            to="/course-detail"
                            className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-200 uppercase text-center"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>

                      {/* RIGHT IMAGE */}
                      <div className="relative h-64 sm:h-80 lg:h-auto order-1 lg:order-2 bg-[#F6F1E9] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 lg:hidden" />
                        <img
                          src={course.image}
                          alt={course.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                    </div>
                  </div>
                ))}
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
