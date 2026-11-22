const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(
                __dirname,
                "node_modules/cesium/Build/Cesium/Workers"
              ),
              to: path.join(__dirname, "public/cesium/Workers"),
            },
            {
              from: path.join(
                __dirname,
                "node_modules/cesium/Build/Cesium/ThirdParty"
              ),
              to: path.join(__dirname, "public/cesium/ThirdParty"),
            },
            {
              from: path.join(
                __dirname,
                "node_modules/cesium/Build/Cesium/Assets"
              ),
              to: path.join(__dirname, "public/cesium/Assets"),
            },
            {
              from: path.join(
                __dirname,
                "node_modules/cesium/Build/Cesium/Widgets"
              ),
              to: path.join(__dirname, "public/cesium/Widgets"),
            },
          ],
        })
      );
    }

    // Needed so Cesium's workers don't break in webpack
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    return config;
  },
};

module.exports = nextConfig;