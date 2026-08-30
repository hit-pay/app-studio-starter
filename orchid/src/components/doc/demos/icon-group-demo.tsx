import { CopyIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { IconGroup, type IconGroupItem } from "@/components/icon-group";

const paymentLink = "https://hitpay.shop/pay/pl_8f2a91";

function ExampleGroup({ style }: { style?: "Default" | "Border" }) {
  const items: IconGroupItem[] = [
    {
      type: "menu",
      key: "more",
      items: [
        { key: "paid", label: "Mark invoice as paid" },
        { key: "reminder", label: "Send reminder" },
        {
          key: "void",
          label: "Void invoice",
          variant: "destructive",
          separator: true,
        },
      ],
      onAction: (item) => console.info(item.key),
    },
    {
      type: "link",
      key: "open",
      href: paymentLink,
      label: "Open payment link",
      icon: <SquareArrowOutUpRightIcon />,
    },
    {
      key: "copy",
      label: "Copy payment link",
      icon: <CopyIcon />,
      onClick: () => void navigator.clipboard.writeText(paymentLink),
    },
  ];

  return <IconGroup style={style} items={items} />;
}

function InvoiceGroup() {
  const invoiceNumber = "INV-2026-0842";
  const items: IconGroupItem[] = [
    {
      type: "menu",
      key: "more",
      items: [
        { key: "download", label: "Download PDF" },
        { key: "duplicate", label: `Duplicate ${invoiceNumber}` },
        {
          key: "cancel",
          label: "Cancel Payment Link",
          variant: "destructive",
          separator: true,
        },
      ],
      onAction: (item) => console.info(item.key),
    },
    {
      type: "link",
      key: "open",
      href: `https://hitpay.shop/invoices/${invoiceNumber}`,
      label: "Open invoice",
      icon: <SquareArrowOutUpRightIcon />,
    },
    {
      key: "copy",
      label: "Copy invoice number",
      icon: <CopyIcon />,
      onClick: () => void navigator.clipboard.writeText(invoiceNumber),
    },
  ];

  return <IconGroup style="Border" items={items} />;
}

function IconGroupDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <ExampleGroup style="Default" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <ExampleGroup style="Border" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice actions
        </p>
        <InvoiceGroup />
      </div>
    </>
  );
}

export { IconGroupDemo };
