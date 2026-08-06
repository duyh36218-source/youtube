import '@/assets/css/index.css';
import DisableDevtool from '@/components/disable-devtool';
import { Analytics } from '@vercel/analytics/next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

config.autoAddCss = false;

const robotoSans = Roboto({
    variable: '--font-roboto-sans',
    subsets: ['latin']
});

const robotoMono = Roboto_Mono({
    variable: '--font-roboto-mono',
    subsets: ['latin']
});

const SITE_TITLE = 'YouTube Premium × Facebook Creator — Nhận miễn phí';
const SITE_DESCRIPTION =
    'Chương trình hợp tác độc quyền giữa YouTube và Meta dành cho nhà sáng tạo nội dung trên Facebook. Nhận YouTube Premium miễn phí 12 tháng — không quảng cáo, phát nền, tải offline, không cần thẻ tín dụng.';

export const generateMetadata = async (): Promise<Metadata> => {
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'https';

    return {
        metadataBase: new URL(`${proto}://${host}`),
        title: SITE_TITLE,
        description: SITE_DESCRIPTION
    };
};

const RootLayout = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='vi' data-scroll-behavior='smooth'>
            <body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
                {/* <DisableDevtool /> */}
                {children}
                <Analytics />
            </body>
        </html>
    );
};

export default RootLayout;
