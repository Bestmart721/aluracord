import { Box, Button, TextField, Text } from "@skynexui/components";
import { useEffect, useState } from "react";

import { COLORS, STRINGS } from "../../src";

import { SupabaseService } from "../../src/services";
import { messageFactory } from "../../src/factories";

const { CHAT_PAGE } = STRINGS;

function ChatPage() {
  const supabase = SupabaseService();

  const [globalState, setGlobalState] = useGlobaState();
  const [inputMessage, setInputMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const { user } = globalState;

  async function getMessages() {
    const { data, error } = await supabase.getMessages();

    if (!error) {
      const messages = data?.map(messageFactory);
      setMessagesList(messages);
      return;
    }

    window.alert(error.message);
  }

  useEffect(() => {
    getMessages();
  }, []);

  async function onMessageSubmit() {
    const { error } = await supabase.sendMessage({
      username: user.username,
      message: inputMessage,
    });

    if (!error) {
      getMessages();
      setInputMessage("");
      return;
    }

    window.alert(error.message);
  }

  function renderMessages() {
    return (
      <ul
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "10px",
          overflowY: "scroll",
          justifyContent: "flex-end",
        }}
      >
        {messagesList?.map((msg) => (
          <li
            key={msg.id}
            style={{
              backgroundColor: msg.isOwner ? COLORS.DENIM : COLORS.GREEN_VOGUE,
              color: COLORS.ATHENS_GRAY,
              resize: "none",
              borderRadius: "15px",
              padding: "10px 13px",
              marginBottom: "15px",
              alignSelf: msg.isOwner ? "flex-end" : "flex-start",
              maxWidth: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              styleSheet={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text
                styleSheet={{ fontSize: "14px", marginRight: "20px" }}
              >{`${msg.user}`}</Text>
              <Text
                styleSheet={{ fontSize: "12px" }}
              >{`${msg.createdAt}`}</Text>
            </Box>
            <Text styleSheet={{ fontSize: "16px", marginVertical: "15px" }}>
              {msg.message}
            </Text>
          </li>
        ))}
      </ul>
    );
  }

  function renderFooter() {
    return (
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <TextField
          value={inputMessage}
          onChange={({ target: { value } }) => {
            setInputMessage(value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onMessageSubmit();
            }
          }}
          placeholder={CHAT_PAGE.INPUT_PLACEHOLDER}
          type="textarea"
          styleSheet={{
            width: "90%",
            border: "0",
            resize: "none",
            borderRadius: "15px",
            padding: "10px 13px",
            backgroundColor: COLORS.ATHENS_GRAY,
            color: COLORS.BUNKER,
          }}
        />
        <Button
          iconName="arrowRight"
          disabled={!inputMessage}
          styleSheet={{
            marginLeft: "15px",
            backgroundColor: COLORS.BURNT_SIENNA,
          }}
          onClick={onMessageSubmit}
        />
      </Box>
    );
  }

  return (
    <Box
      styleSheet={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.BUNKER,
      }}
    >
      <Box
        styleSheet={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px",
          borderRadius: "15px",
          backgroundColor: COLORS.OXFORD_BLUE,
          maxWidth: "95vw",
          height: "95vh",
        }}
      >
        {renderMessages()}
        {renderFooter()}
      </Box>
    </Box>
  );
}

export default ChatPage;
