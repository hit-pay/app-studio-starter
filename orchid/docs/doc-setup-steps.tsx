import { SETUP_GUIDE } from "../api/register-orchid-tools";
import { DocCodePanel } from "./doc-code-panel";

type SetupStep = (typeof SETUP_GUIDE.steps)[number];

function stepCode(step: SetupStep): { filename: string; code: string } | null {
  if ("command" in step && step.command) {
    return { filename: "terminal", code: step.command };
  }

  if ("patch" in step && step.patch) {
    return { filename: step.file, code: JSON.stringify(step.patch, null, 2) };
  }

  if ("append" in step && step.append) {
    return { filename: step.file, code: step.append };
  }

  return null;
}

/**
 * Renders api/register-orchid-tools.ts's SETUP_GUIDE — the same object the
 * get_orchid_setup MCP tool returns — so the setup steps exist in one place
 * instead of being hand-written again in prose here.
 */
function DocSetupSteps() {
  const code = SETUP_GUIDE.steps.map(stepCode);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <p className="text-sm leading-normal text-oc-muted-foreground">
        {SETUP_GUIDE.summary}
      </p>
      {SETUP_GUIDE.steps.map((step, index) => (
        <div key={step.step} className="flex min-w-0 flex-col gap-2">
          <h3 className="text-base font-medium text-oc-foreground">
            {step.step}. {step.title}
          </h3>
          {code[index] ? (
            <DocCodePanel filename={code[index].filename} code={code[index].code} />
          ) : null}
          <p className="text-sm leading-normal text-oc-muted-foreground">
            {step.note}
          </p>
        </div>
      ))}
    </div>
  );
}

export { DocSetupSteps };
