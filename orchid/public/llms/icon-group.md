<!-- Generated from content/docs/components/icon-group.mdx. Do not edit. -->

# Icon Group

Icon cluster with Default and Border; dropdown, link, and copy.

## Example

```tsx
import {
  CopyRegular,
  ArrowRightUpRegular,
} from '@mingcute/react/core-regular';
import { IconGroup, type IconGroupItem } from "@/components/ui/icon-group";

const paymentLink = "https://hitpay.shop/pay/pl_8f2a91";

function ExampleGroup({ style }: { style?: "default" | "border" }) {
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
      icon: <ArrowRightUpRegular />,
    },
    {
      key: "copy",
      label: "Copy payment link",
      icon: <CopyRegular />,
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
      icon: <ArrowRightUpRegular />,
    },
    {
      key: "copy",
      label: "Copy invoice number",
      icon: <CopyRegular />,
      onClick: () => void navigator.clipboard.writeText(invoiceNumber),
    },
  ];

  return <IconGroup style="border" items={items} />;
}

function IconGroupDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <ExampleGroup style="default" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <ExampleGroup style="border" />
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
```

## Usage

```tsx
import { ArrowRightUpRegular } from '@mingcute/react/core-regular';
import { CopyRegular } from '@mingcute/react/core-regular';
import { IconGroup } from "@/components/ui/icon-group";

<IconGroup
  style="border"
  items={[
    {
      type: "menu",
      key: "more",
      items: [
        { key: "download", label: "Download PDF" },
        {
          key: "void",
          label: "Void invoice",
          variant: "destructive",
          separator: true,
        },
      ],
      onAction: (item) => console.log(item.key),
    },
    {
      type: "link",
      key: "open",
      href: "/invoice",
      label: "Open invoice",
      icon: <ArrowRightUpRegular />,
    },
    {
      key: "copy",
      label: "Copy invoice number",
      icon: <CopyRegular />,
      onClick: () => navigator.clipboard.writeText("INV-2026-0842"),
    },
  ]}
/>;
```

`Border` groups automatically render dividers between top-level actions. Use `separator` on a
menu item only when its menu needs a visual grouping boundary.
