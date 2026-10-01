export const education = {
  school: "SRM University, Delhi-NCR",
  degree: "B.Tech. Computer Science & Engineering",
  specialisation: "Data Science & Artificial Intelligence",
  period: "Aug 2022 – May 2026",
  location: "Delhi, India",
  cgpa: "8.37 / 10.00",
  finalFour: "9.03 / 10.00 (90.3%)",
  coursework: [
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science (Predictive Analysis)",
    "Data Warehousing & Data Mining",
    "Big Data Analytics",
    "Cyber Security",
    "Computer Networks",
    "Operating Systems",
    "DBMS",
    "Analysis & Design of Algorithms",
    "Engineering Mathematics I–III",
  ],
};

/**
 * Certifications, newest first. `featured` ones are shown up front; the rest sit behind "Show all".
 * Links are the verification pages printed on each certificate, or Drive copies. A Drive link only works if the file
 * is shared as "Anyone with the link"; private ones were removed on 2026-10-02 (set href to "" to hide a button).
 * `image` (optional) is a path in public/ without extension: <path>.jpg is the full scan, <path>-thumb.jpg the preview.
 */
export const certifications = [
  { name: "AI & Machine Learning, Grade A+", issuer: "Atos Prayas Foundation / ICT Academy", date: "Oct 2025", featured: true, image: "/images/certs/ai-ml-atos", href: "" },
  { name: "SQL and Relational Databases 101", issuer: "IBM Developer Skills Network", date: "Aug 2025", featured: false, href: "https://courses.srmuh.skillsnetwork.site/certificates/f5f28ee7b14e480ab4ac63fe4ff5388e" },
  { name: "Deep Learning for Developers", issuer: "Infosys Springboard", date: "May 2025", featured: true, image: "/images/certs/infosys-deep-learning", href: "" },
  { name: "Quantum Enigmas", issuer: "IBM SkillsBuild", date: "Mar 2025", featured: false, href: "https://www.credly.com/go/sj1roy0R" },
  { name: "Data Science Job Simulation", issuer: "Forage / BCG X", date: "Feb 2025", featured: true, image: "/images/certs/bcg-data-science", href: "https://drive.google.com/file/d/1nWpU_rYiuRvjt0CB-fB_d2lDxiiFo3Hd/view?usp=drive_link" },
  { name: "Introduction to Big Data, Hadoop and the Ecosystems", issuer: "IBM Developer Skills Network", date: "Dec 2024", featured: false, href: "https://courses.srmuh.skillsnetwork.site/certificates/10b7db17620442c4a309753de3d06567" },
  { name: "Machine Learning with R", issuer: "IBM Developer Skills Network", date: "Dec 2024", featured: false, href: "https://courses.srmuh.skillsnetwork.site/certificates/9fa360ad45174871bddb00c423fb9076" },
  { name: "Data Science & Analytics", issuer: "HP LIFE", date: "Nov 2024", featured: false, href: "" },
  { name: "Deep Learning Fundamentals", issuer: "IBM Developer Skills Network", date: "Oct 2024", featured: false, href: "https://courses.srmuh.skillsnetwork.site/certificates/5f54a38591bc412bb549ae8fb13ecf4d" },
  { name: "Data Privacy Fundamentals", issuer: "IBM Developer Skills Network", date: "Oct 2024", featured: false, href: "https://courses.srmuh.skillsnetwork.site/certificates/8d76675f1abf4350b1773895f89b9c89" },
  { name: "Cloud Application Developer", issuer: "IBM Developer Skills Network", date: "May 2024", featured: false, href: "https://courses.srmuh.skillsnetwork.site/certificates/2e737ceea91c435ba341aa2085a4171e" },
  { name: "Complete A.I., ML & Data Science Bootcamp (44 hours)", issuer: "Udemy", date: "May 2024", featured: true, href: "https://drive.google.com/file/d/1fopxlHz1BSc_jjU14z1tI5J0kgaveGa3/view?usp=drive_link" },
  { name: "Introduction to Python", issuer: "IBM Developer Skills Network", date: "Mar 2024", featured: false, href: "https://courses.srmuh.skillsnetwork.site/certificates/361fbc0c2952441f97f64f5c373515f1" },
];

export const languages = [
  { name: "English", level: "IELTS Academic 7.5 (CEFR C1)", href: "" },
  { name: "German", level: "A2", href: "" },
  { name: "Hindi", level: "Native", href: "" },
];

export const leadership = {
  org: "Unwind Connect and Cure (NGO)",
  role: "PR Head and Core Team Member",
  period: "Mar 2024 – Present",
  detail: "Volunteer since August 2022, heading the Public Relations department since March 2024. Lead outreach and communications for the volunteer team.",
  href: "",
};
