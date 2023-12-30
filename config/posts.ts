import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface PostsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: PostsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    {
      title: "Themes",
      href: "/themes",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Figma",
      href: "/docs/figma",
    },
    {
      title: "GitHub",
      href: "https://github.com/shadcn/ui",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/shadcn",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "About",
          href: "/blog/about",
          items: [],
        },
        {
          title: "Siema",
          href: "/blog/siema",
          items: [],
        },
        {
          title: "Siemaelo",
          href: "/blog/siemaelo",
          items: [],
        },
      ],
    },
  ],
};
