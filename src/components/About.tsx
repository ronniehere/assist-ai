
const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            About assistAI
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            "assistAI" is a premier virtual assistant company dedicated to transforming your business operations through exceptional professional support. In today's fast-paced business landscape, staying productive requires more than just regular assistance—it demands intelligent, tech-savvy support that adapts to your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded on the principle that every business professional deserves access to skilled support without the overhead costs of traditional staffing, we work with entrepreneurs, small to medium enterprises, and growing companies who understand the value of efficient, reliable virtual assistance.
            </p>
            <div className="bg-card border border-border p-6 rounded-sm">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Not everything powerful has to look complicated
              </h3>
              <p className="text-muted-foreground">
                We believe in simplicity that delivers results, combining cutting-edge technology with human expertise to create seamless experiences.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-sm border border-border border-l-4 border-l-foreground">
              <div className="flex items-start">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">AI-Powered Communication</h4>
                  <p className="text-muted-foreground">
                    Our ChatGPT integration automatically converts your requests into detailed, actionable task lists, ensuring nothing gets missed and expectations are crystal clear.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-sm border border-border border-l-4 border-l-foreground">
              <div className="flex items-start">
                <div className="text-2xl mr-4">🔧</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Latest Technology Integration</h4>
                  <p className="text-muted-foreground">
                    Every virtual assistant has access to the most advanced tools and software, ensuring they can handle modern business requirements with ease and efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-sm border border-border border-l-4 border-l-foreground">
              <div className="flex items-start">
                <div className="text-2xl mr-4">✅</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cost-Effective Solutions</h4>
                  <p className="text-muted-foreground">
                    Save up to 70% compared to hiring full-time staff or traditional virtual assistant services. Our streamlined platform delivers premium services at competitive rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
