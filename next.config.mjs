/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'si.keen.com',
                pathname: '/cdn-cgi/image/**',
            },
        ],
    },
};

//https://si.keen.com/cdn-cgi/image/width=175,height=175/memberphotos/5357907-1731616408.jpg) 

export default nextConfig;
