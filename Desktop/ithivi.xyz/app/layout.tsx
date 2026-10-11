import './globals.css';

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
        <main>{children}</main>
      </body>
    </html>
  );
}