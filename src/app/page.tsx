import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { Toaster } from "react-hot-toast"

export default function Page() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Toaster toastOptions={{
        style: {
          background: '#1e293b',
          color: '#facc15',
          fontSize: '0.9rem',
        },
        success: {
          icon: '✅',
        },
        error: {
          icon: '⚠️'
        }
      }} position="top-center" reverseOrder={false}/>
    </>
  );
}
