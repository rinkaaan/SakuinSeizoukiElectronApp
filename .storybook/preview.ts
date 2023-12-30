import type { Preview } from "@storybook/react";
import { OpenAPI } from "../openapi-client"

OpenAPI.BASE = "http://localhost:34200"

const preview: Preview = {
  parameters: {},
};

export default preview;
