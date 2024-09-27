module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*",
      },
    ];
  },
  env: {
    API_HOST: "http://localhost:3000",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
