import type { Metadata } from 'next';
import './globals.css';
import { Poppins, Space_Grotesk } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-poppins' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
export const metadata: Metadata = {
 title: 'Jyothi Raditya | Software Engineer',
 description: 'Madina Jyothi Raditya Reddy — software engineer working with Java, Spring Boot, cloud infrastructure, and applied AI. Explore projects, experience, and research.',
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body className={`${poppins.variable} ${space.variable}`}>{children}</body></html>;
}
