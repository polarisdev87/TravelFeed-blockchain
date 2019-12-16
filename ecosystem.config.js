module.exports = {
  apps: [
    {
      name: 'app',
      script: './server.js',
      exec_mode: 'cluster',
      instances: 2,
      env: {
        NODE_ENV: 'production',
      },
      node_args: '--max-old-space-size=6144',
    },
  ],
};
