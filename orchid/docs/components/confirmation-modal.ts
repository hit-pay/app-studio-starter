// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const confirmationModalRegistry = registry.items.find(
  (item: { name: string }) => item.name === "confirmation-modal",
);

const confirmationModalDocs = {
  ...confirmationModalRegistry,
  category: "components",
  props: {
    "ConfirmationModalProvider": "mount once at app root (e.g. __root.tsx)",
    "useConfirmationModal().confirm": "Promise<boolean> — true if confirmed, false if cancelled",
    "confirm().type": ["delete", "warning", "success", "question"],
    "confirm().message": "ReactNode (required)",
    "confirm().title": "ReactNode",
    "confirm().description": "ReactNode",
    "confirm().confirmLabel": "ReactNode",
    "confirm().cancelLabel": "ReactNode",
    "confirm().confirmPhrase": "string (type-to-confirm)",
    "confirm().inputPlaceholder": "string",
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
