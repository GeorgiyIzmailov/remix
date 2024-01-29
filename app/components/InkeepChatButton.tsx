import { useEffect, useState } from "react";
import useInkeepSettings from "../utils/useInkeepSettings";
import { type InkeepChatButtonProps } from "@inkeep/widgets";

export default function ChatButton() {
  const [ChatButton, setChatButton] =
    useState<(e: InkeepChatButtonProps) => JSX.Element>();
  const { baseSettings, aiChatSettings, searchSettings, modalSettings } =
    useInkeepSettings();

  useEffect(() => {
    const loadChatButton = async () => {
      try {
        const { InkeepChatButton } = await import("@inkeep/widgets");
        setChatButton(() => InkeepChatButton);
      } catch (error) {
        console.error("Failed to load ChatButton:", error);
      }
    };

    loadChatButton();
  }, []);

  const chatButtonProps: InkeepChatButtonProps = {
    chatButtonType: "ICON_TEXT_SHORTCUT",
    baseSettings,
    aiChatSettings,
    searchSettings,
    modalSettings,
  };

  return ChatButton && <ChatButton {...chatButtonProps} />;
}
