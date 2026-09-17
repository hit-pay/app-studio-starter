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
