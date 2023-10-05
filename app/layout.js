import Navbar from "./components/Navbar";
import "./globals.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "FilmNet",
  description: "explore movies, tvshow, and people",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
