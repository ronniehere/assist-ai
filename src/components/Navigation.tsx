
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleScheduleCall = () => {
    window.open("https://calendly.com/abe-sshift/15-minute-meeting-for-assistai", "_blank");
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button onClick={() => navigate('/')} className="text-2xl font-bold text-foreground">
              assistAI
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Process
              </button>
              <button 
                onClick={() => navigate('/blog')}
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </button>
              <Button 
                onClick={handleScheduleCall}
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background px-6 py-2 rounded-sm transition-all duration-300"
              >
                Schedule a call
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-sm transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-muted-foreground hover:text-foreground px-3 py-2 text-base font-medium w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block text-muted-foreground hover:text-foreground px-3 py-2 text-base font-medium w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className="block text-muted-foreground hover:text-foreground px-3 py-2 text-base font-medium w-full text-left"
              >
                Process
              </button>
              <button 
                onClick={() => navigate('/blog')}
                className="block text-muted-foreground hover:text-foreground px-3 py-2 text-base font-medium w-full text-left"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-muted-foreground hover:text-foreground px-3 py-2 text-base font-medium w-full text-left"
              >
                Contact
              </button>
              <Button 
                onClick={handleScheduleCall}
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background px-6 py-2 rounded-sm transition-all duration-300 w-full mt-2"
              >
                Schedule a call
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-sm transition-all duration-300 w-full mt-2"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
