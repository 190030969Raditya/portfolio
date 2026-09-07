import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Raditya Madina | Software Engineer',
 description: 'Madina Jyothi Raditya Reddy — software engineer working with Java, Spring Boot, cloud infrastructure, and applied AI. Explore projects, experience, and research.',
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body>{children}</body></html>;
}
