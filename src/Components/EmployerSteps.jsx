import React from "react";
import { Briefcase, FileText, Handshake, ClipboardCheck } from "lucide-react";

const EmployerSteps = () => {
  const steps = [
    {
      icon: <Briefcase className="w-10 h-10" style={{ color: "#224D41" }} />,
      title: "Post Your Job",
      desc: "Create a job listing with details like requirements and budget.",
    },
    {
      icon: <FileText className="w-10 h-10" style={{ color: "#224D41" }} />,
      title: "Review Applicants",
      desc: "Receive and evaluate applications from freelancers.",
    },
    {
      icon: <Handshake className="w-10 h-10" style={{ color: "#224D41" }} />,
      title: "Choose a Freelancer",
      desc: "Conduct interviews or discussions to choose the best candidate.",
    },
    {
      icon: <ClipboardCheck className="w-10 h-10" style={{ color: "#224D41" }} />,
      title: "Manage the Project",
      desc: "Collaborate with the selected freelancer to complete the project.",
    },
  ];

  return (
    <section className="bg-[#FAF7F1] py-16">
      <div className="container mx-auto px-6">
        {/* Heading aligned left */}
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-2">
            How It Works On Employers
          </h2>
          <p className="text-gray-500">
            Recruitment made easy in 100 seconds
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-white hover:shadow-xl transition duration-300"
            >
              {step.icon}
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployerSteps;
