"use client";

import { useTheme } from "next-themes";
import {
  BellFill,
  BellSlash,
  Check,
  Microphone,
  MicrophoneSlash,
  Moon,
  Power,
  Sun,
  VolumeFill,
  VolumeSlashFill,
} from "@gravity-ui/icons";
import {Switch} from "@heroui/react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const icons = {
    darkMode: {
      off: Moon,
      on: Sun,
      selectedControlClass: "",
    },
  };

  // return (
  //   <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  //     Toggle {theme === "dark" ? "Light" : "Dark"} Mode
  //   </button>


  // );

  return (
    <div className="flex gap-3">
      {Object.entries(icons).map(([key, value]) => (
        <Switch onChange={() => setTheme(theme === "dark" ? "light" : "dark")} key={key} defaultSelected aria-label={key} size="lg">
          {({isSelected}) => (
            <Switch.Content>
              <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                <Switch.Thumb>
                  <Switch.Icon>
                    {isSelected ? (
                      <value.on className="size-3 text-inherit opacity-100" />
                    ) : (
                      <value.off className="size-3 text-inherit opacity-70" />
                    )}
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </Switch.Content>
          )}
        </Switch>
      ))}
    </div>
  );
}