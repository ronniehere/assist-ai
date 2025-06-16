
const Services = () => {
  const services = [
    {
      title: "Virtual Assistants",
      description: "Dedicated professionals who become an extension of your team, handling day-to-day tasks with precision and care.",
      features: ["Email management", "Calendar coordination", "Travel planning", "Project management"]
    },
    {
      title: "Administrative Support",
      description: "Comprehensive administrative services that keep your business running smoothly while you focus on growth.",
      features: ["Data entry", "Document preparation", "CRM management", "Customer service"]
    },
    {
      title: "Research & Analysis",
      description: "In-depth research and analytical services that provide you with the insights needed for informed decision-making.",
      features: ["Market research", "Competitor analysis", "Lead generation", "Data analysis"]
    },
    {
      title: "Content Creation",
      description: "Professional content development that enhances your brand presence and engages your target audience.",
      features: ["Blog writing", "Social media content", "Email campaigns", "Presentation design"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive virtual assistant services designed to streamline your operations and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
