import './globals.css';
import { Navbar } from './components/Navbar';

export const metadata = {
  title: 'Thiviyanath M. | Software Engineer & Full Stack Developer',
  description: 'Portfolio of Thiviyanath Maheswaran - Full Stack Developer & DevOps Specialist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="font-mono bg-black text-white selection:bg-emerald-500 selection:text-black">
        <Navbar />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}