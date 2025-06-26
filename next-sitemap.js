module.exports = {
  siteUrl: 'https://marburger.vercel.app', 
  generateRobotsTxt: true, 
  robotsTxtOptions: {
    policy: [
      { 
        userAgent: '*',
        disallow: ['/api', '/private', '/_next/',, '/404', '/500', '/dashboard/', '/auth/'], 
        allow: '/',
      },
    ],
  },
};
