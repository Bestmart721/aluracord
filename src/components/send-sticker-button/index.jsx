import { useState } from "react";
import { COLORS } from "../../res/colors";
import { STRINGS } from "../../res/strings";
import { STICKERS } from "../../res/stickers";

import { Box, Button, Image, Text } from "@skynexui/components";

const { SEND_STICKER_COMPONENT } = STRINGS;

export function SendStickerButton({ handleStickerClick }) {
  const [isOpen, setIsOpen] = useState(false);

  function renderDropMenu() {
    if (!isOpen) {
      return null;
    }

    return (
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "5px",
          position: "absolute",
          backgroundColor: COLORS.GREEN_VOGUE,
          width: {
            xs: "200px",
            sm: "290px",
          },
          height: "300px",
          right: "30px",
          bottom: "30px",
          padding: "16px",
          boxShadow:
            "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text
          styleSheet={{
            color: COLORS.ATHENS_GRAY,
            fontWeight: "bold",
          }}
        >
          {SEND_STICKER_COMPONENT.TITLE}
        </Text>
        <Box
          tag="ul"
          styleSheet={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            flex: 1,
            paddingTop: "16px",
            overflow: "scroll",
          }}
        >
          {STICKERS.map((sticker) => (
            <Text
              onClick={() => handleStickerClick?.(`:sticker:${sticker}`)}
              tag="li"
              key={sticker}
              styleSheet={{
                width: "50%",
                maxWidth: "100px",
                borderRadius: "5px",
                padding: "10px",
                focus: {
                  backgroundColor: COLORS.DENIM,
                },
                hover: {
                  backgroundColor: COLORS.BURNT_SIENNA,
                },
              }}
            >
              <Image src={sticker} />
            </Text>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <Button
        styleSheet={{
          borderRadius: "50%",
          padding: "0 3px 0 0",
          minWidth: "50px",
          minHeight: "50px",
          fontSize: "20px",
          lineHeight: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.BURNT_SIENNA,
          filter: isOpen ? "grayscale(0)" : "grayscale(1)",
          hover: {
            filter: "grayscale(0)",
          },
        }}
        label="😋"
        onClick={() => setIsOpen(!isOpen)}
      />
      {renderDropMenu()}
    </Box>
  );
}
