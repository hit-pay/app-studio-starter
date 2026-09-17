// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const formLayoutRegistry = registry.items.find(
  (item: { name: string }) => item.name === "form-layout",
);

const FORM_LAYOUT_FIELDS_SNIPPET = `const FORM_LAYOUT_FIELDS = [
  {
    key: "name",
    title: "Product name",
    type: "input",
    placeholder: "Studio Membership",
    required: true,
    value: "",
  },
  { key: "sku", title: "SKU", type: "input", placeholder: "SKU-MEM-001", value: "" },
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
    placeholder: "Shown in Online Store, POS, and invoices.",
    value: "",
  },
];`;

const formLayoutDocs = {
  ...formLayoutRegistry,
  category: "components",
  props: {
    mode: ["page", "modal"],
    title: "string",
    description: "string",
    formId: "string",
    actions: "FormLayoutActions",
    onClose: "function",
    open: "boolean",
    onOpenChange: "function",
    size: ["sm", "default", "lg", "medium", "fullscreen", "confirmation"],
    persistent: "boolean",
  },
  examples: [
    {
      description: "Page create form",
      code: `function PageFormLayoutExample() {
  ${FORM_LAYOUT_FIELDS_SNIPPET}
  const formId = "product-form";
  const form = useFormBuilder({
    fields: FORM_LAYOUT_FIELDS,
    onSubmit: () => undefined,
  });

  return (
    <div className="h-96 overflow-hidden rounded-lg border border-oc-border">
      <FormLayout
        title="Add product"
        description="Scroll the body; Save submits through formId."
        formId={formId}
        onClose={() => undefined}
        actions={{ save: { label: "Save product" } }}
      >
        <FormBuilder id={formId} form={form} />
      </FormLayout>
    </div>
  );
}

render(<PageFormLayoutExample />);`,
    },
    {
      description: "Modal create form",
      code: `function ModalFormLayoutExample() {
  ${FORM_LAYOUT_FIELDS_SNIPPET}
  const [open, setOpen] = useState(false);
  const formId = "customer-form";
  const form = useFormBuilder({
    fields: FORM_LAYOUT_FIELDS,
    onSubmit: () => setOpen(false),
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add customer</Button>
      <FormLayout
        mode="modal"
        open={open}
        onOpenChange={setOpen}
        title="Add customer"
        description="Cancel and Save stay pinned while fields scroll."
        formId={formId}
        size="lg"
        actions={{ save: { label: "Save customer" } }}
      >
        <FormBuilder id={formId} form={form} />
      </FormLayout>
    </>
  );
}

render(<ModalFormLayoutExample />);`,
    },
  ],
  related_components: ["form-builder", "page-layout", "dialog", "button"],
};

export default formLayoutDocs;
