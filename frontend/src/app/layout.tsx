import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className='flex flex-col justify-center items-center'>
          {children}
        </main>
      </body>
    </html>
  );
}
