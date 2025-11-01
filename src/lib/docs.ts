export type NavItem = {
  title: string;
  href: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

// Automatically generate sidebar from your file structure
export const docsConfig: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/components/install-nextjs" },
      { title: "Install Tailwind CSS", href: "/components/install-tailwind" },
      { title: "Install Utils", href: "/components/install-utils" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Interactive Button", href: "/components/interactive-button" },
      { title: "QR Code Button", href: "/components/qr-code-button" },
      { title: "Password Strong", href: "/components/password-strong" },
      { title: "Card Expand", href: "/components/card-expand" },
      { title: "Pixelated Shader", href: "/components/pixelated-shader" },
    ],
  },
];
