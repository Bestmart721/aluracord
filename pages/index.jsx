import { Box, Button, Text, TextField, Image } from "@skynexui/components";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { COLORS, PAGES, STRINGS } from "../src/index";

import { useGlobaState } from "../src/hooks";
import { userFactory } from "../src/factories";
import { GithubService } from "../src/services";

const { HOME_PAGE } = STRINGS;

function HomePage() {
  const router = useRouter();
  const github = GithubService();

  const [globalState, setGlobalState] = useGlobaState();
  const [inputUsername, setInputUsername] = useState("");
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const { user } = globalState;

  useEffect(async () => {
    if (shouldFetchData) {
      const { data } = await github.getUserData(inputUsername);

      setShouldFetchData(false);
      setGlobalState({ ...globalState, user: userFactory(data) });
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
                setGlobalState({ ...globalState, user: null });
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
          <Box styleSheet={{ paddingVertical: "15px", height: "15px" }}>
            <Text variant="heading5" styleSheet={{ color: COLORS.GREEN_VOGUE }}>
              {user?.name}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
