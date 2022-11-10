import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className="h-full">
        <main className="h-full p-10">{children}</main>
      </body>
    </html>
  );
}
