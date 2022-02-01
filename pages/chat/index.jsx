import { Box, Button, TextField, Text, Image } from "@skynexui/components";
import { useEffect, useState } from "react";

import { COLORS, STRINGS, PAGES } from "../../src";

import { SupabaseService } from "../../src/services";
import { messageFactory } from "../../src/factories";
import { useGlobaState } from "../../src/hooks";
import { useRouter } from "next/router";
import { SendStickerButton } from "../../src/components/send-sticker-button";

const { CHAT_PAGE } = STRINGS;

function ChatPage() {
  const router = useRouter();
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
    if (!user) {
      router.push(PAGES.HOME);
    }

    getMessages();

    const subscription = supabase.syncMessages((newMessage) => {
      setMessagesList((currentMessages) => {
        return [messageFactory(newMessage), ...currentMessages];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function onMessageSubmit(message) {
    const { error } = await supabase.sendMessage({
      username: user.username,
      message,
    });

    if (!error) {
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
          flexDirection: "column-reverse",
          overflowY: "scroll",
          width: "100%",
          padding: "10px",
        }}
      >
        {messagesList?.map((msg) => (
          <li
            key={msg.id}
            style={{
              backgroundColor:
                msg.user === user?.username ? COLORS.DENIM : COLORS.GREEN_VOGUE,
              color: COLORS.ATHENS_GRAY,
              resize: "none",
              borderRadius: "15px",
              padding: "10px 13px",
              marginBottom: "15px",
              alignSelf:
                msg.user === user?.username ? "flex-end" : "flex-start",
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
            {msg.isSticker ? (
              <Image src={msg.message.replace(":sticker:", "")} />
            ) : (
              <Text styleSheet={{ fontSize: "16px", marginVertical: "15px" }}>
                {msg.message}
              </Text>
            )}
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
        <Image
          src={user?.avatarURL}
          styleSheet={{
            width: "60px",
            borderRadius: "100%",
            marginLeft: "",
          }}
        />
        <TextField
          value={inputMessage}
          onChange={({ target: { value } }) => {
            setInputMessage(value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onMessageSubmit(inputMessage);
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
            marginHorizontal: "15px",
            backgroundColor: COLORS.ATHENS_GRAY,
            color: COLORS.BUNKER,
          }}
        />
        <SendStickerButton handleStickerClick={onMessageSubmit} />
        <Button
          iconName="arrowRight"
          disabled={!inputMessage}
          styleSheet={{
            backgroundColor: COLORS.BURNT_SIENNA,
          }}
          onClick={() => onMessageSubmit(inputMessage)}
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
