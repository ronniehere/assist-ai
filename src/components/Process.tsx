
const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Get Matched with Your VA",
      description: "Our collaboration begins with a thorough discovery phase where we learn about your business needs, preferences, and objectives to ensure we assign the perfect virtual assistant for your specific requirements."
    },
    {
      number: "02",
      title: "Communicate Through Our App",
      description: "Based on our discovery findings, you gain access to our intuitive chat platform where you can communicate directly with your virtual assistant in real-time, share files, and track progress."
    },
    {
      number: "03",
      title: "AI-Powered Task Management",
      description: "Our ChatGPT integration automatically converts your requests into detailed, actionable task lists, ensuring proper understanding and eliminating miscommunication before work begins."
    },
    {
      number: "04",
      title: "Review and Approve",
      description: "We deliver task breakdowns for your review and approval, ensuring complete alignment with your expectations and giving you full control over the process before execution."
    },
    {
      number: "05",
      title: "Professional Execution",
      description: "We regularly monitor progress and maintain open communication throughout execution, continuously refining our approach to deliver exceptional results that exceed your expectations."
    }
  ];

  return (
    <section id="process" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A streamlined approach that ensures you get the perfect virtual assistant match and exceptional results
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-sm flex items-center justify-center text-lg font-bold mr-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              
              <div className="flex-1">
                <div className="bg-card border border-border p-8 rounded-sm">
                  <div className="w-full h-32 bg-muted rounded-sm flex items-center justify-center">
                    <div className="text-6xl font-bold text-muted-foreground">{step.number}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-card border border-border p-12 rounded-sm">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Ready to Transform Your Productivity?</h3>
            <p className="text-xl mb-8 text-muted-foreground">
              Join hundreds of business professionals who have already discovered the power of professional virtual assistance. Get started today and experience the difference quality support can make.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-sm font-semibold text-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Start Your Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
