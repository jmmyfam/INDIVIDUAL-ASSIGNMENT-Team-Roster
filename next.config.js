module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,

  images: {
    domains: ['assets.stickpng.com', 'media2.giphy.com'],
  },
};
