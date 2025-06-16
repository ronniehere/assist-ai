
const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About assistAI
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            "assistAI" is a premier virtual assistant company dedicated to transforming your business operations through exceptional professional support. In today's fast-paced business landscape, staying productive requires more than just regular assistance—it demands intelligent, tech-savvy support that adapts to your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded on the principle that every business professional deserves access to skilled support without the overhead costs of traditional staffing, we work with entrepreneurs, small to medium enterprises, and growing companies who understand the value of efficient, reliable virtual assistance.
            </p>
            <div className="bg-gradient-to-r from-teal-600 to-orange-600 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">
                Not everything powerful has to look complicated
              </h3>
              <p className="opacity-90">
                We believe in simplicity that delivers results, combining cutting-edge technology with human expertise to create seamless experiences.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-teal-50 p-6 rounded-xl border-l-4 border-teal-600">
              <div className="flex items-start">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Communication</h4>
                  <p className="text-gray-600">
                    Our ChatGPT integration automatically converts your requests into detailed, actionable task lists, ensuring nothing gets missed and expectations are crystal clear.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-600">
              <div className="flex items-start">
                <div className="text-2xl mr-4">🔧</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Latest Technology Integration</h4>
                  <p className="text-gray-600">
                    Every virtual assistant has access to the most advanced tools and software, ensuring they can handle modern business requirements with ease and efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-600">
              <div className="flex items-start">
                <div className="text-2xl mr-4">✅</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cost-Effective Solutions</h4>
                  <p className="text-gray-600">
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
