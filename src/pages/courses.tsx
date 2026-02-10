import { useRef } from "react";
import uxiImage from "../assets/uxi.png";
import {
  Award,
  Users,
  Star,
  Layout,
  MonitorPlay,
  Figma
} from "lucide-react";

const Courses = () => {
  // Add simple hover animation ref if needed, or just use CSS
  // Using standard Lucide icons for consistency

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-24 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-sans antialiased">
          {/* Page Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F3D2E] tracking-tight mb-4">
              Featured Course
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Level up your skills with our highest-rated professional design curriculum.
            </p>
          </div>

          {/* Featured Course Card */}
          <div className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 ring-1 ring-gray-100">

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">

              {/* LEFT CONTENT */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between order-2 lg:order-1 relative z-10">
                {/* Background decorative blob or gradients could go here via absolute positioning if 'rich aesthetics' requested, 
                    but keeping it clean specific to User's 'perfect' request might mean polished simplicity. */}

                <div className="space-y-8">

                  {/* Badge & Rating Row */}
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] text-xs sm:text-sm font-bold text-[#1E6B4F] tracking-wide uppercase">
                      <Award className="w-4 h-4" strokeWidth={2.5} />
                      Top Rated
                    </span>

                    <div className="flex items-center gap-1.5 text-amber-500">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-1 text-sm font-semibold text-gray-700">4.9 <span className="text-gray-500 font-normal">(6,234 reviews)</span></span>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A291E] leading-tight">
                      Master UI/UX Design <br className="hidden lg:block" /> From Scratch
                    </h3>
                  </div>

                  <div className="h-px bg-gray-200 w-full" />

                  {/* Instructor */}
                  <div className="flex items-center gap-4">
                    <img
                      src="https://i.pravatar.cc/150?u=emma"
                      alt="Emma Harrison"
                      className="w-12 h-12 rounded-full ring-2 ring-gray-100"
                    />
                    <div>
                      <p className="font-bold text-[#0A291E] text-lg leading-none">
                        Emma Harrison
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Senior Product Designer @ Google
                      </p>
                    </div>
                  </div>

                  {/* Skills heading */}
                  <div>
                    <p className="text-lg font-bold text-black mb-4">
                      Skills you&apos;ll master
                    </p>

                    {/* Skills list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 font-medium">
                      <div className="flex items-center gap-2.5">
                        <Users className="w-5 h-5 text-[#1E6B4F]" />
                        User research & personas
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Figma className="w-5 h-5 text-[#1E6B4F]" />
                        Figma & Sketch mastery
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MonitorPlay className="w-5 h-5 text-[#1E6B4F]" />
                        Interactive prototyping
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Layout className="w-5 h-5 text-[#1E6B4F]" />
                        Design systems
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                {/* CTA only (Price removed) */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1E6B4F] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#1E6B4F]/25 hover:bg-[#165a41] hover:scale-[1.02] active:scale-95 transition-all duration-200">
                    ENROLL NOW
                  </button>
                </div>

              </div>

              {/* RIGHT IMAGE */}
              <div className="relative h-64 sm:h-80 lg:h-auto order-1 lg:order-2 bg-[#F6F1E9] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 lg:hidden" />
                <img
                  src={uxiImage}
                  alt="UI UX Course"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
