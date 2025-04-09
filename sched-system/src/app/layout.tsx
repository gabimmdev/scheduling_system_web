import "./style/globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-900 text-white" 
      >
        {children}
      </body>
    </html>
  );
}
