import { motion } from "framer-motion";
import { Sparkles, Target, Award, ExternalLink } from "lucide-react";

const coreSkills = [
  { name: "Python", level: "primary" },
  // { name: "Go", level: "primary" },
  { name: "TypeScript", level: "primary" },
  { name: "PyTorch", level: "primary" },
  // { name: "Kubernetes", level: "secondary" },
  { name: "PostgreSQL", level: "secondary" },
  { name: "Docker", level: "secondary" },
  { name: "FastAPI", level: "secondary" },
  { name: "React", level: "primary" },
  { name: "Node.js", level: "secondary" },
  { name: "TensorFlow", level: "secondary" },
];

const focusAreas = [
  "Model Deployment",
  "Applied ML Research",
  "Web Development",
  "Saas Products",
];

const certificates = [
  {
    name: "Generative AI Engineering with LLMs",
    issuer: "IBM",
    date: "Apr 2026",
    credentialId: "V1H36QXQRWL1",
    link: "https://coursera.org/share/05d9e3a1fb2f5d98bd4e70ef99627b96",
    logo: <img src="https://media.licdn.com/dms/image/v2/D560BAQGiz5ecgpCtkA/company-logo_200_200/company-logo_200_200/0/1688684715866/ibm_logo?e=1776902400&v=beta&t=DdS_AmJzO8hVZJzkCH0A37Kd4MX4miZ-oSSRUJKGI-A" alt="IBM Logo" className="w-full h-full object-contain" />,
    skills: ["RAG, LangChain, Transformer"],
  },
  {
    name: "Preparing for Google Cloud Certification: Machine Learning Engineer",
    issuer: "Google Cloud Skills Boost",
    date: "Mar 2026",
    credentialId: "KG62UL4WAIA7",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/KG62UL4WAIA7",
    logo: <img src="https://media.licdn.com/dms/image/v2/D560BAQFV-ds_iFfVSQ/company-logo_200_200/company-logo_200_200/0/1698660876286?e=1776902400&v=beta&t=2GnVrsRq1wynozhdkNYd4XPOVEkI3tphpICSOR1KhYc" alt="Google Logo" className="w-full h-full object-contain" />,
  },
  {
    name: "Computer Vision for Engineering and Science",
    issuer: "MathWorks",
    date: "Mar 2026",
    credentialId: "W8DXDYCYKQOE",
    link: "https://coursera.org/share/34eda6555fe9cae7b8b16a389688768b",
    logo: <img src="https://media.licdn.com/dms/image/v2/C4D0BAQFSs_qwxqsJBg/company-logo_200_200/company-logo_200_200/0/1631312468202?e=1776902400&v=beta&t=D039wNMoEYQgzQSve6_4tQN74m7w2K7vqR6O3z0AAkk" alt="MathWorks Logo" className="w-full h-full object-contain" />,
    skills: ["Object Detection"],
  },
  {
    name: "Python Essentials for MLOps",
    issuer: "Duke University",
    date: "Mar 2026",
    credentialId: "FJWWKCUUT08Z",
    link: "https://coursera.org/share/d502160a0e86531c9b809943361f46c5",
    logo: <img src="https://media.licdn.com/dms/image/v2/D560BAQGVn2MO4DWnLg/company-logo_200_200/B56ZbZv8i_H4AI-/0/1747409948261?e=1776902400&v=beta&t=8nBgtMzjbGg4feKeV4DgO9BrfTEMTODViDU0N2mxfG0" alt="Duke University Logo" className="w-full h-full object-contain" />,
  },
  {
    name: "Advanced Deep Learning Techniques for Computer Vision",
    issuer: "MathWorks",
    date: "Mar 2026",
    credentialId: "00H4OAU2V9VI",
    link: "https://coursera.org/share/c117e21c4b502528eb110dd950ccad2d",
    logo: <img src="https://media.licdn.com/dms/image/v2/C4D0BAQFSs_qwxqsJBg/company-logo_200_200/company-logo_200_200/0/1631312468202?e=1776902400&v=beta&t=D039wNMoEYQgzQSve6_4tQN74m7w2K7vqR6O3z0AAkk" alt="MathWorks Logo" className="w-full h-full object-contain" />,
    skills: ["Object Detection", "Anomaly Detection"],
  },
  {
    name: "Image Processing for Engineering and Science",
    issuer: "MathWorks",
    date: "Mar 2026",
    credentialId: "PLACEHOLDER",
    link: "https://coursera.org/share/47e47d454e2c2360862a2a9643d610e8",
    logo: <img src="https://media.licdn.com/dms/image/v2/C4D0BAQFSs_qwxqsJBg/company-logo_200_200/company-logo_200_200/0/1631312468202?e=1776902400&v=beta&t=D039wNMoEYQgzQSve6_4tQN74m7w2K7vqR6O3z0AAkk" alt="MathWorks Logo" className="w-full h-full object-contain" />,
  },
];

export function Skills() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-8 md:py-32">
        {/* Header */}
        <motion.header 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Skills
          </h1>
          <p className="text-lg text-black/50">
            The tools I actually use every day.
          </p>
        </motion.header>

        {/* Core Skills */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[hsl(0,84%,60%)]" />
            <span className="font-mono text-xs text-black/40 uppercase tracking-wider">
              Core Stack
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {coreSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`
                  px-5 py-3 rounded-2xl font-medium text-sm cursor-default
                  ${skill.level === "primary" 
                    ? 'bg-black text-white' 
                    : 'bg-black/5 text-black/70 border border-black/10'
                  }
                `}
                data-testid={`skill-${skill.name.toLowerCase()}`}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Focus Areas */}
        {/* <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-4 h-4 text-[hsl(0,84%,60%)]" />
            <span className="font-mono text-xs text-black/40 uppercase tracking-wider">
              Focus Areas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 group"
                data-testid={`focus-${i}`}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]"
                  whileHover={{ scale: 1.5 }}
                />
                <span className="text-black/80 group-hover:text-black transition-colors">
                  {area}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* Certificates */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-4 h-4 text-[hsl(0,84%,60%)]" />
            <span className="font-mono text-xs text-black/40 uppercase tracking-wider">
              Certificates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, i) => (
              <motion.a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)" }}
                className="group relative p-5 rounded-2xl border border-black/10 bg-white hover:bg-black/2 transition-colors duration-300 flex items-start gap-4"
              >
                {/* Logo */}
                <div className="shrink-0 w-12 h-12 text-2xl flex items-center justify-center">
                  {cert.logo}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-black text-sm leading-snug pr-2">
                      {cert.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-black/20 group-hover:text-black/60 shrink-0 transition-colors" />
                  </div>
                  <p className="text-xs text-black/60 font-medium mb-2">{cert.issuer}</p>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-xs text-black/40">Issued {cert.date}</p>
                    <p className="text-xs text-black/50 font-mono text-right">ID {cert.credentialId}</p>
                  </div>
                  {cert.skills && cert.skills.length > 0 && (
                    <p className="text-xs text-black/50">
                      <span className="font-semibold">Skills:</span> {cert.skills.join(", ")}
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Current Focus */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 bg-black/2 rounded-2xl border border-black/5"
        >
          <p className="font-mono text-xs text-black/40 uppercase tracking-wider mb-3">
            Current Focus
          </p>
          <p className="text-black/70 leading-relaxed">
            Applied machine learning research and model deployment, building
            scalable SaaS products, and enhancing web development skills.
          </p>
        </motion.section> */}

        {/* Footer */}
        <motion.footer 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-mono text-sm text-black/30">
            leveling up every day.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
