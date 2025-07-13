import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import AppProviders from "@/context/AppProviders";
import { Toaster } from "react-hot-toast";
import { AdminMenu } from "@/components/ui/admin/AdminMenu";
import { Content } from "@/components/ui/Content";
  

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

/*
    const authIdToken = (await headers()).get('Authorization')?.split('Bearer ')[1];

    // Initialize the FirebaseServerApp instance.
    const serverApp = initializeServerApp(firebaseConfig, { authIdToken });

    // Initialize Firebase Authentication using the FirebaseServerApp instance.
    const auth = getAuth(serverApp);

    if (auth.currentUser) {
        redirect('/profile');
    }
*/
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <AppProviders>
          <Content>
            { children }
          </Content>
          </AppProviders>
        </Providers>
        <Script
          src="https://kit.fontawesome.com/40a42e87f5.js"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
