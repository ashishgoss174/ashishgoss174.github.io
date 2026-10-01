import type { Hue } from "@/lib/types";

/**
 * Excerpts quoted as written in recommendation letters and certificates (see documents/).
 * `source` says which kind of document it is. One quote per organisation.
 * Faculty recommendations go first when added: they matter most for master's applications.
 * Before publishing, check that each person is happy to be quoted on a public page. Set to [] to hide the section.
 */
export const testimonials: { quote: string; name: string; title: string; org: string; context: string; source: "Faculty recommendation" | "Employer recommendation" | "Internship certificate" | "Volunteer certificate"; hue: Hue }[] = [
  {
    quote: "His ability to translate clinical needs into technical solutions made him a key asset to our team.",
    name: "Dr. Maria-Ella Kadas",
    title: "CEO",
    org: "Nocturne GmbH, Berlin",
    context: "Data Scientist intern, 2024",
    source: "Employer recommendation",
    hue: "rose",
  },
  {
    quote: "His ability to translate complex requirements into intuitive and visually appealing design elements greatly enhanced the overall quality of the application.",
    name: "Shubham Khairwal",
    title: "Founder and CEO",
    org: "Piyaau Beverages",
    context: "UI/UX designer, 2024",
    source: "Employer recommendation",
    hue: "grape",
  },
  {
    quote: "Throughout this journey, you have demonstrated hard work, enthusiasm, and a commitment to excellence.",
    name: "Sharthak Acharjee",
    title: "Senior Manager",
    org: "Celebal Technologies",
    context: "Data Science intern, Summer Internship 2025",
    source: "Internship certificate",
    hue: "mint",
  },
  {
    quote: "…dedication, commitment, and enthusiasm in all the tasks assigned.",
    name: "",
    title: "Director",
    org: "ADQVEST Capital Advisors",
    context: "Data Analyst intern on Thurro, 2025",
    source: "Internship certificate",
    hue: "sun",
  },
  {
    quote: "…his excellent work and service as the Public Relations Department Head at Unwind Connect and Cure.",
    name: "Lavanya Shukla",
    title: "Founder and Trustee",
    org: "Unwind Connect and Cure",
    context: "PR Department Head, since 2024",
    source: "Volunteer certificate",
    hue: "accent",
  },
];
