"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, Logo } from "@/components/icons";
import { UserSession } from "./ui/home/UserSession";
import { ShoppingCartButton } from "./ui/home/ShoppingCartButton";
import { useContext } from "react";
import { CartContext } from "@/context/cart";
import { Button } from "@heroui/button";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";

export const Navbar = () => {

  const { isAdmin, isLogged, onLogout, user } = useContext(AuthContext);
  const { count } = useContext(CartContext);
  const router = useRouter();
  
  const handleAdminAccount = () => {
    if( isAdmin ){
      router.push("/admin");
    }else{
      router.push("/admin/orders");
    }
  };
  
  return (
    <HeroUINavbar maxWidth="xl"/*  position="sticky"  */className="z-[50]">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">INVERSIONES MILEY</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex basis-3/5 sm:basis-full">
        <ul className="justify-start hidden gap-4 ml-2 lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="items-center hidden gap-2 sm:flex">
          {(isAdmin || user.roles.includes("ROLE_WAREHOUSE") || user.roles.includes("ROLE_TRANSPORT")) && (
          <Button
            onPress={handleAdminAccount}
            color="primary"
            variant="flat"
            startContent={<i className="fa-solid fa-user"></i>}
          >
            Admin Panel
          </Button>
        )}
          <UserSession isLogged={isLogged} />
          <ShoppingCartButton cartItemsCount={count}/>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="flex flex-col gap-2 mx-4 mt-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
