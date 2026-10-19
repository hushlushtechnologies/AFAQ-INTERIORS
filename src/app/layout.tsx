import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Caveat , Fraunces, Gloock, Public_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { IntroProvider } from "@/components/layout/Preloader";

export const metadata: Metadata = {
  title: {
    default: "Afaq Interiors | Luxury Interior Design in Dubai",
    template: "%s | Afaq Interiors",
  },
  description:
    "Luxury interiors, thoughtful architecture and complete turnkey solutions crafted in Dubai.",
};

const body = Public_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
// const heading = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-heading", display: "swap" });
const heading = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-heading",
  display: "swap",
});
const script = Caveat({ subsets: ["latin"], variable: "--font-handwriting", display: "swap" });



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en" className={`${body.variable} ${heading.variable} ${script.variable}`}>

    //   <body>
    //     <SmoothScroll>
    //       <Navbar />
    //       {children}
    //       <Footer />
    //     </SmoothScroll>
    //   </body>
    // </html>

        <html lang="en" className={`${body.variable} ${heading.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before paint: skip the intro if already seen this session (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("afaq-intro"))document.documentElement.dataset.intro="skip"}catch(e){}`,
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <IntroProvider>
            <Navbar />
            {children}
            <Footer />
          </IntroProvider>
        </SmoothScroll>
      </body>
    </html>
    
  );
}