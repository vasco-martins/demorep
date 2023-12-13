import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface NavbarProps {
  logoWhite?: boolean;
}

export default function Navbar({ logoWhite }: NavbarProps) {
  const { data: session } = useSession();
  return (
    <div
      className={`flex items-center justify-between px-8 py-4 ${
        logoWhite ? "bg-black" : ""
      }`}
    >
      <Link href="/">
        <img
          src={logoWhite ? "/assets/logo-white.svg" : "/assets/logo.svg"}
          alt="Logo"
          width={100}
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {session?.user ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {session.user.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <NavigationMenuLink onClick={() => signOut()}>
                    Logout
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <Link href="/auth/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
