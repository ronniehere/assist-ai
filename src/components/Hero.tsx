
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Transform Your
            <span className="block text-foreground">
              Business Productivity
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Professional virtual assistant services for business professionals who need reliable support at a fraction of traditional costs
          </p>
          
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg rounded-sm transition-all duration-300"
          >
            GET STARTED
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-card rounded-sm border border-border hover:border-muted transition-colors">
            <div className="text-3xl font-bold text-foreground mb-2">70%</div>
            <div className="text-muted-foreground">Cost Savings</div>
          </div>
          <div className="text-center p-6 bg-card rounded-sm border border-border hover:border-muted transition-colors">
            <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </div>
          <div className="text-center p-6 bg-card rounded-sm border border-border hover:border-muted transition-colors">
            <div className="text-3xl font-bold text-foreground mb-2">AI</div>
            <div className="text-muted-foreground">Powered Technology</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
