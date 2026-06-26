"use client";
import { ThemeProvider } from "next-themes";

const NextThemProvider = ({children}) => {
    return (
         <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
    );
};

export default NextThemProvider;