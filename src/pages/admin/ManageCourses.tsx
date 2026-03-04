import { motion } from "framer-motion";
import { ExternalLink, ListChecks, ArrowLeft, Settings, Database, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ManageCourses = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-grow py-12 px-4 lg:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                                <Settings className="w-4 h-4" />
                                Admin Dashboard
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black text-foreground">
                                Course <span className="text-primary">Management</span>
                            </h1>
                            <p className="text-muted-foreground font-medium mt-1">
                                Preview the registration form and access response data.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Link to="/">
                                <Button variant="outline" className="rounded-xl border-border/50">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Site
                                </Button>
                            </Link>
                            <a
                                href="https://docs.google.com/forms/d/1FAIpQLSfKu6iyvjk0iqNbmB_FLmhXOI9CHYFKH_PlkM_ziHNq4iyZOA/edit#responses"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold">
                                    <ListChecks className="w-4 h-4 mr-2" />
                                    View Google Responses
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Live Form Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <div className="bg-white rounded-3xl border border-border/50 shadow-xl overflow-hidden">
                                <div className="p-4 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                        <span className="ml-2 text-xs font-bold text-muted-foreground opacity-60">Live Preview</span>
                                    </div>
                                    <a
                                        href="https://forms.gle/dVK9td4omENXCzvCA"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                    >
                                        Open in New Tab <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                                <div className="p-0 overflow-hidden min-h-[700px]">
                                    <iframe
                                        src="https://docs.google.com/forms/d/e/1FAIpQLSfKu6iyvjk0iqNbmB_FLmhXOI9CHYFKH_PlkM_ziHNq4iyZOA/viewform?embedded=true"
                                        className="w-full min-h-[700px] border-0"
                                        title="Registration Form Preview"
                                    >
                                        Loading…
                                    </iframe>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats & Integrations */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-3xl p-6 border border-border/50 shadow-xl">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Database className="text-primary w-5 h-5" />
                                    Response Integration
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Registration data is collected via Google Forms. You can access the raw responses, summaries, and spreadsheets using the links below.
                                </p>

                                <div className="space-y-4">
                                    <a
                                        href="https://docs.google.com/forms/d/1FAIpQLSfKu6iyvjk0iqNbmB_FLmhXOI9CHYFKH_PlkM_ziHNq4iyZOA/edit"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-all group"
                                    >
                                        <div className="font-bold text-sm group-hover:text-primary transition-colors">Edit Form Questions</div>
                                        <div className="text-[10px] text-muted-foreground mt-1">Access Admin Editor</div>
                                    </a>

                                    <a
                                        href="https://docs.google.com/forms/d/1FAIpQLSfKu6iyvjk0iqNbmB_FLmhXOI9CHYFKH_PlkM_ziHNq4iyZOA/edit#responses"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-all group"
                                    >
                                        <div className="font-bold text-sm group-hover:text-primary transition-colors">View Analytics Summary</div>
                                        <div className="text-[10px] text-muted-foreground mt-1">Charts & Demographics</div>
                                    </a>

                                    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs font-bold text-foreground">Google Integration Active</span>
                                        </div>
                                        <RefreshCw className="w-3 h-3 text-primary animate-spin-slow" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                                <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
                                <p className="text-sm text-slate-400">
                                    To receive email notifications for every new registration, go to the "Responses" tab in Google Forms and select "Get email notifications for new responses".
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ManageCourses;
