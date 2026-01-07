import type { Plugin } from "@opencode-ai/plugin";
import type { Event } from "@opencode-ai/sdk";

import { removeSessionMappings } from "./state";
import { createTools } from "./tools";

const getDeletedSessionId = (event: Event) =>
  event.type === "session.deleted" ? event.properties.info.id : "";

const OpenTreesPlugin: Plugin = async (ctx) => ({
  tool: createTools(ctx),
  event: async ({ event }) => {
    const sessionID = getDeletedSessionId(event);
    if (!sessionID) return;
    await removeSessionMappings(sessionID);
  },
});

export default OpenTreesPlugin;
