module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_LOCAL}/:path*`,
      },
    ];
  },
  env: {
    API_HOST: `${process.env.API_HOST}`,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
