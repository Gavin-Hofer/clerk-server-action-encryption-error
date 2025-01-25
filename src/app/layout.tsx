import { unstable_noStore as noStore } from "next/cache";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // To observe the error, every page must be dynamic.
  noStore();
  return (
    <html lang="en">
      <body>
        <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
