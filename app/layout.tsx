export const metadata = {
  title: 'Reflection Buddy',
  description: 'A tool to help you reflect on your day.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
