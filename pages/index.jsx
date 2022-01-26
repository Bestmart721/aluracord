import { Container } from "../app/components";
import { STRINGS } from "../app/res";
import { COLORS } from "../app/style";

import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useState } from "react";

const { HOME_PAGE } = STRINGS;

function HomePage() {
  const [username, setUsername] = useState("");

  return (
    <Container>
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
            maxWidth: "33%",
            height: "25%",
            padding: "25px",
            borderRadius: "15px",
            backgroundColor: COLORS.OXFORD_BLUE,
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
              onChange={({ target: { value } }) => setUsername(value)}
              value={username}
              styleSheet={{
                marginVertical: "25px",
              }}
            />
            <Button
              colorVariant="light"
              iconName="github"
              label={HOME_PAGE.LOGIN_BUTTON_LABEL}
              rounded="md"
              variant="secondary"
              disabled={!username}
            />
          </Box>
          <Image
            src={
              username
                ? `https://github.com/${username}.png`
                : `https://via.placeholder.com/150/F5F7FA?text=:+)`
            }
            styleSheet={{
              borderRadius: "100%",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
