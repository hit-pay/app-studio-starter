// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const bannerRegistry = registry.items.find(
  (item: { name: string }) => item.name === "banner",
);

const bannerDocs = {
  ...bannerRegistry,
  category: "ui",
  props: {
    variant: ["default", "success", "warning", "destructive"],
    placement: ["top-right", "bottom"],
  },
  examples: [
    {
      description: "Default notice",
      code: `<Banner>
  <InformationIcon />
  <BannerTitle>PayNow delay</BannerTitle>
  <BannerDescription>
    Payments may take longer than usual. Consider using Cards or GrabPay.
  </BannerDescription>
</Banner>`,
    },
    {
      description: "Success and warning",
      code: `<Banner variant="success">
  <CheckCircleIcon />
  <BannerTitle>Payment received</BannerTitle>
  <BannerDescription>
    SGD 128.00 for INV-2048 was paid through PayNow.
  </BannerDescription>
</Banner>`,
    },
    {
      description: "Top-right action",
      code: `<Banner>
  <InformationIcon />
  <BannerTitle>PayNow delay</BannerTitle>
  <BannerDescription>Payments may take longer than usual.</BannerDescription>
  <BannerAction>
    <Button variant="outline" size="sm">View status</Button>
  </BannerAction>
</Banner>`,
    },
    {
      description: "Bottom actions",
      code: `<Banner variant="success">
  <CheckCircleIcon />
  <BannerTitle>Invoice created</BannerTitle>
  <BannerDescription>
    INV-2048 for SGD 128.00 was created and sent to Priya Nair.
  </BannerDescription>
  <BannerAction placement="bottom">
    <Button variant="outline" size="sm">View invoice</Button>
    <Button size="sm">Send reminder</Button>
  </BannerAction>
</Banner>`,
    },
  ],
  related_components: ["toast", "button", "badge"],
};

export default bannerDocs;
