/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "megacord",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: { region: "us-east-1" },
        cloudflare: "6.17.0",
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb", {
      domain: {
        name: "megacord.org",
        dns: sst.cloudflare.dns(),
        redirects: ["www.megacord.org"],
      },
    });
  },
});
