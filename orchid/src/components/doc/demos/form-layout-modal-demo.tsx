import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FormLayout } from "@/components/form-layout";
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from "@/components/form-builder";
import { toast } from "@/components/ui/toast";

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
