import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AuthProvider } from '@/context/AuthContext';
import { Inter, Noto_Serif_SC } from "next/font/google";
import "../globals.css"; // Adjusted path to point to globals.css in src/app

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSerifSC = Noto_Serif_SC({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-serif-sc"
});

export const metadata = {
    title: "Lumina Loop",
    description: "High-end 3D jewelry configurator",
};

import { AdminProvider } from '@/context/AdminContext'

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <AdminProvider>
                    <NextIntlClientProvider locale={locale} messages={await getMessages()}>
                        {children}
                    </NextIntlClientProvider>
                </AdminProvider>
            </body>
        </html>
    );
}
