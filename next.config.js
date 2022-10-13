module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 10 * 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 100,
  },
};
