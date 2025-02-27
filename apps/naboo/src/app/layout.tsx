import './global.css';

export const metadata = {
  title: 'Welcome to naboo',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          id="tenant-stylesheet"
          rel="stylesheet"
          href={'http://localhost:3000/assets/default/css/tenant.css'}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
