const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "https://k4px9ykgri.execute-api.us-east-2.amazonaws.com",
      changeOrigin: true,
      pathRewrite: {
        '^/api/': ''
      }
    })
  );
};
