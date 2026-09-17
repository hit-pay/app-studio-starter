// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const confirmationModalRegistry = registry.items.find(
  (item: { name: string }) => item.name === "confirmation-modal",
);

const confirmationModalDocs = {
  ...confirmationModalRegistry,
  category: "components",
  usage:
    "Mount ConfirmationModalProvider once at the app root (e.g. __root.tsx). Call useConfirmationModal() in any child to open a Promise-based confirm — await returns true if confirmed, false if cancelled.",
  props: {
    type: ["delete", "warning", "success", "question"],
    message: "ReactNode (required)",
    title: "ReactNode",
    description: "ReactNode",
    confirmLabel: "ReactNode",
    cancelLabel: "ReactNode",
    confirmPhrase: "string (type-to-confirm)",
    inputPlaceholder: "string",
  },
  examples: [
    {
      description: "Delete confirm",
      code: `function DeleteLinkExample() {
  const confirm = useConfirmationModal();

  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const ok = await confirm({
          type: "delete",
          message: "Do you want to delete this payment link?",
          description: "The action can't be undone.",
        });
        if (ok) {
          save();
        }
      }}
    >
      Delete link
    </Button>
  );
}

render(<DeleteLinkExample />);`,
    },
    {
      description: "Type phrase to confirm",
      code: `const ok = await confirm({
  type: "delete",
  message: "Delete the weekend-workshop payment link?",
  description: "The action can't be undone.",
  confirmPhrase: "weekend-workshop",
});`,
    },
  ],
  related_components: ["dialog", "button", "input"],
};

export default confirmationModalDocs;
