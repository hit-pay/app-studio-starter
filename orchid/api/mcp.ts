import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
// @ts-ignore — component documentation is intentionally authored as standalone JavaScript.
import buttonDocs from "../docs/ui/button";
import buttonGroupDocs from "../docs/ui/button-group";
import avatarDocs from "../docs/ui/avatar";
import badgeDocs from "../docs/ui/badge";
import bannerDocs from "../docs/ui/banner";
import skeletonDocs from "../docs/ui/skeleton";
import spinnerDocs from "../docs/ui/spinner";
import toastDocs from "../docs/ui/toast";
import checkboxDocs from "../docs/ui/checkbox";
import fieldDocs from "../docs/ui/field";
import fileUploadDocs from "../docs/ui/file-upload";
import formSectionDocs from "../docs/ui/form-section";
import inputDocs from "../docs/ui/input";
import inputGroupDocs from "../docs/ui/input-group";
import labelDocs from "../docs/ui/label";
import radioGroupDocs from "../docs/ui/radio-group";
import sliderDocs from "../docs/ui/slider";
import switchDocs from "../docs/ui/switch";
import textareaDocs from "../docs/ui/textarea";
import tabsDocs from "../docs/ui/tabs";
import paginationDocs from "../docs/ui/pagination";
import dialogDocs from "../docs/ui/dialog";
import drawerDocs from "../docs/ui/drawer";
import dropdownMenuDocs from "../docs/ui/dropdown-menu";

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_orchid_components",
      {
        description: "Returns a small sample list of Orchid UI components.",
        inputSchema: {
          category: z.string().optional(),
        },
      },
      async ({ category }) => {
        const components = [buttonDocs, buttonGroupDocs, avatarDocs, badgeDocs, bannerDocs, skeletonDocs, spinnerDocs, toastDocs, checkboxDocs, fieldDocs, fileUploadDocs, formSectionDocs, inputDocs, inputGroupDocs, labelDocs, radioGroupDocs, sliderDocs, switchDocs, textareaDocs, tabsDocs, paginationDocs, dialogDocs, drawerDocs, dropdownMenuDocs].filter(
          (component) => !category || component.category === category,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ components }),
            },
          ],
        };
      },
    );
  },
);

export { handler as GET, handler as POST, handler as DELETE };
