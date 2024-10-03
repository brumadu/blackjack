module.exports = {
  env: {
    API_HOST: `${process.env.API_HOST}`,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
