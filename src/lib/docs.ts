export type NavItem = {
  title: string;
  href: string;
  label?: "new" | "updated" | "beta" | "deprecated";
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
      { title: "AI Input", href: "/components/ai-input", label: "beta" },
      {
        title: "Interactive Button",
        href: "/components/interactive-button",
        label: "beta",
      },
      {
        title: "QR Code Button",
        href: "/components/qr-code-button",
        label: "beta",
      },
      {
        title: "Calendar Widget",
        href: "/components/calendar-widget",
        label: "beta",
      },
      {
        title: "Password Strong",
        href: "/components/password-strong",
        label: "beta",
      },
      { title: "Card Expand", href: "/components/card-expand", label: "beta" },
      { title: "Resend Card", href: "/components/resend-card", label: "beta" },
      {
        title: "Pixelated Shader",
        href: "/components/pixelated-shader",
        label: "beta",
      },
    ],
  },
];
