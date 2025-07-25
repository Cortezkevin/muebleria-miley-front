export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Inversiones Miley",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Productos",
      href: "/products",
    }
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Productos",
      href: "/products",
    }
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui"
  },
};
