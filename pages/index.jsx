import { Box, Button, Text, TextField, Image } from "@skynexui/components";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { COLORS, PAGES, STRINGS } from "../src/index";

const { HOME_PAGE } = STRINGS;

function HomePage() {
  const router = useRouter();

  const [inputUsername, setInputUsername] = useState("");
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    if (shouldFetchData) {
      const userData = await fetch(
        `https://api.github.com/users/${inputUsername}`
      );

      setShouldFetchData(false);
      setUser(await userData.json());
    }
  }, [shouldFetchData, inputUsername]);

  function getButtonLabel() {
    if (user) {
      return HOME_PAGE.GO_TO_CHAT_BUTTON_LABEL;
    }

    return HOME_PAGE.LOGIN_BUTTON_LABEL;
  }

  return (
    <Box
      styleSheet={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.BUNKER,
        paddingVertical: "15vh",
        paddingHorizontal: "30vw",
      }}
    >
      <Box
        styleSheet={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px",
          borderRadius: "15px",
          backgroundColor: COLORS.OXFORD_BLUE,
          maxWidth: "720px",
        }}
      >
        <Box
          styleSheet={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            paddingRight: "100px",
          }}
        >
          <Text
            variant="heading4"
            styleSheet={{ color: COLORS.CATSKILL_WHITE }}
          >
            {HOME_PAGE.TITLE}
          </Text>
          <TextField
            placeholder={HOME_PAGE.USERNAME_INPUT_LABEL}
            hasLabel={false}
            onChange={({ target: { value } }) => {
              if (user) {
                setUser(null);
              }

              setInputUsername(value);
            }}
            value={inputUsername}
            styleSheet={{
              marginVertical: "25px",
            }}
          />
          <Button
            colorVariant="light"
            iconName="github"
            label={getButtonLabel()}
            rounded="md"
            variant="secondary"
            disabled={!inputUsername}
            onClick={() => {
              if (user) {
                router.push(PAGES.CHAT);
              } else {
                setShouldFetchData(true);
              }
            }}
          />
        </Box>
        <Box
          styleSheet={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.ONAHAU,
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Image
            src={
              inputUsername
                ? `https://github.com/${inputUsername}.png`
                : `https://via.placeholder.com/150/F5F7FA?text=:+)`
            }
            styleSheet={{
              width: "150px",
              height: "150px",
              borderRadius: "100%",
            }}
          />
          <Text
            variant="heading5"
            styleSheet={{ color: COLORS.GREEN_VOGUE, marginTop: "15px" }}
          >
            {user?.name}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
