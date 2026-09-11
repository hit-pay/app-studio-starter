<!-- Generated from content/docs/components/form-layout.mdx. Do not edit. -->

# Form Layout

Create and edit form shell with page and modal modes.

`FormLayout` is the shell for create and edit forms. It provides page or modal
presentation, headings, scrolling, close behavior, and actions. `FormBuilder`
renders the fields inside that shell.

## Example

```tsx
import { useRef, useState } from "react";

import { Button } from "@ui/actions/button";
import { FormLayout } from "@/components/layout/form-layout";
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from "@/components/form/form-builder";
import { toast } from "@ui/feedback/toast";

const PRODUCT_FIELDS: SchemaFormField[] = [
  {
    key: "basics",
    title: "Basics",
    type: "section",
    description: "Long form to test page-body scroll under the top actions.",
  },
  {
    key: "name",
    title: "Product name",
    type: "input",
    placeholder: "Studio Membership",
    required: true,
    value: "",
  },
  { key: "sku", title: "SKU", type: "input", placeholder: "SKU-MEM-001", value: "" },
  { key: "barcode", title: "Barcode", type: "input", value: "" },
  {
    key: "price",
    title: "Price (SGD)",
    type: "input",
    placeholder: "29.00",
    required: true,
    value: "",
  },
  { key: "compare_at", title: "Compare-at price", type: "input", value: "" },
  { key: "cost", title: "Cost price", type: "input", value: "" },
  {
    key: "qty",
    title: "Quantity",
    type: "quantity",
    value: 1,
    min: 0,
    max: 999,
  },
  {
    key: "description",
    title: "Description",
    type: "textarea",
    placeholder: "Shown in Online Store, POS, invoices, and payment links.",
    value: "",
  },
  { key: "inventory", title: "Inventory", type: "section" },
  { key: "warehouse", title: "Warehouse", type: "input", value: "Harbourfront" },
  { key: "bin", title: "Bin location", type: "input", value: "" },
  { key: "reorder_at", title: "Reorder date", type: "date", value: "" },
  { key: "supplier", title: "Supplier", type: "input", value: "" },
  { key: "supplier_sku", title: "Supplier SKU", type: "input", value: "" },
  { key: "seo", title: "SEO", type: "section" },
  { key: "seo_title", title: "SEO title", type: "input", value: "" },
  { key: "seo_description", title: "SEO description", type: "textarea", value: "" },
  { key: "slug", title: "URL handle", type: "input", value: "" },
  { key: "notes", title: "Internal notes", type: "textarea", value: "" },
];

const PRODUCT_DETAILS_FIELDS: SchemaFormField[] = [
  {
    key: "name",
    title: "Product name",
    type: "input",
    placeholder: "T-shirt",
    required: true,
    value: "",
  },
  {
    key: "sku",
    title: "SKU",
    type: "input",
    placeholder: "TS 123456",
    value: "",
  },
  {
    key: "barcode",
    title: "Barcode",
    type: "input",
    placeholder: "123456",
    value: "",
  },
  {
    key: "price",
    title: "Selling price (SGD)",
    type: "input",
    placeholder: "100.00",
    required: true,
    value: "",
  },
  {
    key: "description",
    title: "Description",
    type: "textarea",
    value: "",
  },
];

const PUBLISH_SETTINGS_FIELDS: SchemaFormField[] = [
  {
    key: "status",
    title: "Status",
    type: "select",
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
    value: "published",
  },
  {
    key: "image",
    title: "Product image",
    type: "file",
    description: "Upload the primary product image.",
    value: "",
  },
  {
    key: "category",
    title: "Category",
    type: "combobox",
    placeholder: "Select category",
    options: [
      { value: "apparel", label: "Apparel" },
      { value: "accessories", label: "Accessories" },
      { value: "home", label: "Home" },
    ],
    value: "",
  },
  {
    key: "availability",
    title: "Availability",
    type: "checkbox-group",
    options: [
      { value: "online-store", label: "Online Store" },
      { value: "point-of-sale", label: "Point of Sale" },
    ],
    value: ["online-store", "point-of-sale"],
  },
];

function FormLayoutPageDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Full page with top actions
        </p>
        <ClosePageExample />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Two-column product form
        </p>
        <TwoColumnPageExample />
      </div>
    </>
  );
}

function ClosePageExample() {
  const [creating, setCreating] = useState(false);

  if (!creating) {
    return <Button onClick={() => setCreating(true)}>Create product</Button>;
  }

  return (
    <div className="h-144 overflow-hidden rounded-xl border border-oc-border">
      <ProductForm
        id="close-product-form"
        onClose={() => setCreating(false)}
        onSaved={() => setCreating(false)}
      />
    </div>
  );
}

function ProductForm({
  id,
  onClose,
  onSaved,
}: {
  id: string;
  onClose: () => void;
  onSaved?: () => void;
}) {
  const form = useSchemaForm({
    fields: PRODUCT_FIELDS,
    onSubmit: () => {
      toast.add({ title: "Product saved", type: "success" });
      onSaved?.();
    },
  });

  return (
    <FormLayout
      title="Create product"
      description="Add a product to your catalog and sales channels."
      onClose={onClose}
      formId={id}
      actions={{
        save: { label: "Create" },
      }}
    >
      <SchemaForm id={id} form={form} className="max-w-none" />
    </FormLayout>
  );
}

function TwoColumnPageExample() {
  const [creating, setCreating] = useState(false);

  if (!creating) {
    return (
      <Button onClick={() => setCreating(true)}>Create advanced product</Button>
    );
  }

  return (
    <div className="h-160 overflow-hidden rounded-xl border border-oc-border">
      <TwoColumnProductForm
        onClose={() => setCreating(false)}
        onSaved={() => setCreating(false)}
      />
    </div>
  );
}

function TwoColumnProductForm({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const submittedForms = useRef(new Set<"details" | "settings">());

  const completeSave = (section: "details" | "settings") => {
    submittedForms.current.add(section);
    if (submittedForms.current.size !== 2) return;

    toast.add({ title: "Product saved", type: "success" });
    onSaved();
  };

  const productDetails = useSchemaForm({
    fields: PRODUCT_DETAILS_FIELDS,
    onSubmit: () => completeSave("details"),
  });
  const publishSettings = useSchemaForm({
    fields: PUBLISH_SETTINGS_FIELDS,
    onSubmit: () => completeSave("settings"),
  });
  const saving = productDetails.isSubmitting || publishSettings.isSubmitting;

  const save = () => {
    submittedForms.current.clear();
    void Promise.all([productDetails.submit(), publishSettings.submit()]);
  };

  return (
    <FormLayout
      title="Add product"
      description="Configure the product details and pricing."
      onClose={onClose}
      className="[&>div:last-child>div]:max-w-none"
      actions={{
        save: {
          label: "Create",
          disabled: saving,
          onClick: save,
        },
      }}
    >
      <div className="grid min-h-full lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
        <div className="pb-8 lg:pr-8 lg:pb-0">
          <SchemaForm form={productDetails} className="max-w-none" />
        </div>

        <div className="border-t border-oc-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-oc-foreground">
              Publish
            </h2>
            <p className="mt-1 text-sm text-oc-muted-foreground">
              Set visibility and product organization.
            </p>
          </div>
          <SchemaForm form={publishSettings} className="max-w-none" />
        </div>
      </div>
    </FormLayout>
  );
}

export { FormLayoutPageDemo };
```

## Example

```tsx
import { useState } from "react";

import { Button } from "@ui/actions/button";
import { FormLayout } from "@/components/layout/form-layout";
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from "@/components/form/form-builder";
import { toast } from "@ui/feedback/toast";

const CUSTOMER_FIELDS: SchemaFormField[] = [
  {
    key: "contact",
    title: "Contact",
    type: "section",
    description: "Long form to test modal body scroll and a pinned footer.",
  },
  { key: "name", title: "Name", type: "input", required: true, value: "" },
  {
    key: "email",
    title: "Email",
    type: "input",
    validation: "email",
    required: true,
    value: "",
  },
  { key: "phone", title: "Phone", type: "phone", value: "" },
  { key: "job_title", title: "Job title", type: "input", value: "" },
  { key: "company", title: "Company", type: "input", value: "" },
  { key: "website", title: "Website", type: "input", value: "" },
  {
    key: "address",
    title: "Address",
    type: "section",
    description: "Billing and shipping.",
  },
  { key: "line1", title: "Address line 1", type: "input", required: true, value: "" },
  { key: "line2", title: "Address line 2", type: "input", value: "" },
  { key: "city", title: "City", type: "input", value: "" },
  { key: "state", title: "State / region", type: "input", value: "" },
  { key: "postal", title: "Postal code", type: "input", value: "" },
  { key: "country", title: "Country", type: "input", value: "Singapore" },
  {
    key: "billing",
    title: "Billing",
    type: "section",
  },
  {
    key: "channel",
    title: "Preferred channel",
    type: "choice-card",
    options: [
      { value: "paynow", label: "PayNow", description: "Instant bank transfer" },
      { value: "card", label: "Card", description: "Visa, Mastercard, AMEX" },
    ],
    value: "paynow",
  },
  {
    key: "amount+currency",
    title: "Credit limit",
    type: "input-group",
    options: [
      { value: "sgd", label: "SGD" },
      { value: "usd", label: "USD" },
    ],
    value: { amount: "", currency: "sgd" },
  },
  {
    key: "tax_id",
    title: "Tax ID",
    type: "input",
    value: "",
  },
  {
    key: "invoice_email",
    title: "Invoice email",
    type: "input",
    validation: "email",
    value: "",
  },
  {
    key: "preferences",
    title: "Preferences",
    type: "section",
  },
  {
    key: "locale",
    title: "Language",
    type: "select",
    options: [
      { value: "en", label: "English" },
      { value: "id", label: "Bahasa Indonesia" },
      { value: "zh", label: "Chinese" },
    ],
    value: "en",
  },
  {
    key: "tags",
    title: "Tags",
    type: "combobox",
    props: { multiple: true },
    options: [
      { value: "vip", label: "VIP" },
      { value: "wholesale", label: "Wholesale" },
      { value: "retail", label: "Retail" },
    ],
    value: [],
  },
  {
    key: "channels",
    title: "Notify via",
    type: "checkbox-group",
    options: [
      { value: "email", label: "Email" },
      { value: "sms", label: "SMS" },
      { value: "whatsapp", label: "WhatsApp" },
    ],
    value: ["email"],
  },
  { key: "newsletter", title: "Subscribe to updates", type: "switch", value: false },
  { key: "notes", title: "Internal notes", type: "textarea", value: "" },
  { key: "handoff", title: "Handoff notes", type: "textarea", value: "" },
  {
    key: "next_follow_up",
    title: "Next follow-up",
    type: "datetime",
    value: "",
  },
];

function FormLayoutModalDemo() {
  const [open, setOpen] = useState(false);
  const formId = "customer-form";
  const form = useSchemaForm({
    fields: CUSTOMER_FIELDS,
    onSubmit: () => {
      toast.add({ title: "Customer saved", type: "success" });
      setOpen(false);
    },
  });

  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Customer form
        </p>
        <Button onClick={() => setOpen(true)}>Add customer</Button>
        <FormLayout
          mode="modal"
          open={open}
          onOpenChange={setOpen}
          title="Add customer"
          description="Scroll the fields. Cancel and Save stay pinned at the bottom."
          formId={formId}
          size="lg"
          actions={{
            save: { label: "Save customer" },
          }}
        >
          <SchemaForm id={formId} form={form} />
        </FormLayout>
      </div>
    </>
  );
}

export { FormLayoutModalDemo };
```

## Page mode

Page mode is the default. Save submits the external form identified by
`formId`; the submit button does not need to live inside `FormBuilder`.

```tsx
import { FormLayout } from "@/components/layout/form-layout";
import { FormBuilder } from "@/components/form/form-builder";

<FormLayout
  title="Create product"
  description="Add a product to your catalog."
  formId="product-form"
  onClose={handleClose}
  actions={{ save: { label: "Create" } }}
>
  <FormBuilder id="product-form" form={form} />
</FormLayout>;
```

## Modal mode

Modal mode preserves controlled dialog semantics through `open` and
`onOpenChange`. `size` and `persistent` are available only in modal mode.

```tsx
<FormLayout
  mode="modal"
  open={open}
  onOpenChange={setOpen}
  title="Create customer"
  description="Add a new customer"
  formId="customer-form"
  onClose={handleClose}
  actions={{
    cancel: { disabled: isSaving },
    save: { label: "Save customer", disabled: isSaving },
  }}
>
  <FormBuilder id="customer-form" form={form} />
</FormLayout>
```

Both actions are rendered by default. Cancel calls `onClose`; in modal mode it
then closes the controlled dialog. Save submits `formId`. Each action supports
custom `label`, `icon`, `onClick`, `disabled`, and `loading` values.
