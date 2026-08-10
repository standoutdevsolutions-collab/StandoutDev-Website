// app/layout.js

import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Grain from "@/components/site/Grain";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/site/CustomCursor";

export const metadata = {
  title: "StandoutDev — We craft award-winning digital products",
  description:
    "StandoutDev is a design & engineering studio building cinematic web experiences, brands, and products that stand out.",
  verification: {
    google: "VeFhhYNtV58B8z-8tQ8fFfDoHlairJsC8GoiBBmv-F4",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TP3P4VLV');`}
        </Script>
        {/* End Google Tag Manager */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);',
          }}
        />
      </head>
      <body className="bg-[#0a0e27] text-white antialiased overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TP3P4VLV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Providers>
          <SmoothScrollProvider>
            <Grain />
            <CustomCursor />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}