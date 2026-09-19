export const site = {
  name: "Esho",
  nameSuffix: "EDUTECH",
  tagline: "Practical IT Training — Hardware, Networking, Microsoft, Cisco & Linux",
  location: "Sector V, Kolkata",
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  email: "admissions@eshoedutech.com",
  address: ["Esho EDUTECH", "Sector V, Kolkata, West Bengal"],
  copyright: `© ${new Date().getFullYear()} Esho EDUTECH. All Rights Reserved.`,
};

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Courses", href: "/#courses" },
  { label: "Packages", href: "/#packages" },
  { label: "Contact", href: "/#contact" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Copyright Policy", href: "/copyright-policy" },
  { label: "Cookies Policy", href: "/cookies-policy" },
];
