import { Toaster as Sonner } from "@/components/ui/sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { LearnerLayout } from "./components/learner/LearnerLayout";

// Lazy-loaded components for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Courses = lazy(() => import("./pages/courses"));
const SignUp = lazy(() => import("./pages/SignUp"));
const LogIn = lazy(() => import("./pages/LogIn"));
const About = lazy(() => import("./pages/About"));
const Register = lazy(() => import("./pages/Register"));
const Contact = lazy(() => import("./pages/Contact"));

// Learner Dashboard Imports
const LearnerDashboard = lazy(() => import("./pages/learners/Dashboard"));
const MyCourses = lazy(() => import("./pages/learners/MyCourses"));
const CoursePlayer = lazy(() => import("./pages/learners/CoursePlayer"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Loading INSHLT...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />

            {/* Learner Dashboard Routes */}
            <Route path="/learners" element={<LearnerLayout />}>
              <Route index element={<MyCourses />} />
              <Route path="dashboard" element={<LearnerDashboard />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="my-courses/:id" element={<CoursePlayer />} />
              <Route path="quiz" element={<div className="p-8 text-center bg-white rounded-3xl shadow-xl mt-12"><h2 className="text-2xl font-black">Quiz Score</h2><p className="text-gray-500 mt-2 font-bold">Coming soon...</p></div>} />
              <Route path="certificates" element={<div className="p-8 text-center bg-white rounded-3xl shadow-xl mt-12"><h2 className="text-2xl font-black">Certificates</h2><p className="text-gray-500 mt-2 font-bold">Coming soon...</p></div>} />
              <Route path="calendar" element={<div className="p-8 text-center bg-white rounded-3xl shadow-xl mt-12"><h2 className="text-2xl font-black">Calendar</h2><p className="text-gray-500 mt-2 font-bold">Coming soon...</p></div>} />
              <Route path="settings" element={<div className="p-8 text-center bg-white rounded-3xl shadow-xl mt-12"><h2 className="text-2xl font-black">Settings</h2><p className="text-gray-500 mt-2 font-bold">Coming soon...</p></div>} />
            </Route>

            <Route path="/courses" element={<Courses />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
