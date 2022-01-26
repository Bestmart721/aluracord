import { Box } from "@skynexui/components";

import { COLORS } from "../../src";

function ChatPage() {
  return (
    <Box
      styleSheet={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.DENIM,
      }}
    />
  );
}

export default ChatPage;
