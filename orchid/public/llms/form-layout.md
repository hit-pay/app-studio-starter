<!-- Generated from content/docs/components/form-layout.mdx. Do not edit. -->

# Form Layout

Create and edit form shell with page and modal modes.

`FormLayout` is the shell for create and edit forms. It provides page or modal
presentation, headings, scrolling, close behavior, and actions. `FormBuilder`
renders the fields inside that shell.

## Example

```tsx
import { FormLayoutModalDemo } from "./form-layout-modal-demo";
import { FormLayoutPageDemo } from "./form-layout-page-demo";

function FormLayoutDemo() {
  return (
    <>
      <FormLayoutPageDemo />
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Modal form
        </p>
        <FormLayoutModalDemo />
      </div>
    </>
  );
}

export { FormLayoutDemo };
```

## Page mode

Page mode is the default. Save submits the external form identified by
`formId`; the submit button does not need to live inside `FormBuilder`.

```tsx
import { FormLayout } from "@/components/ui/form-layout";
import { FormBuilder } from "@/components/ui/form-builder";

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
