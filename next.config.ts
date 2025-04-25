import type { NextConfig } from 'next';

import path from 'path';

const nextConfig: NextConfig = {
  images: {
<<<<<<< Updated upstream
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '**'
      }
    ]
  },
=======
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com']
  },
  /* config options here */
>>>>>>> Stashed changes
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['public'] = path.resolve(__dirname, 'public');
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false
                }
              ]
            },
            titleProp: true
          }
        }
      ]
    });
    return config;
  }
};

export default nextConfig;
