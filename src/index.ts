import { Lightning, Launch, PlatformSettings, AppData } from "@lightningjs/sdk";
import { App } from "./App.js";
import { App2 } from "./App2.js";
import { LandingPage } from "./LandingPage.js";

export default function (
  appSettings: Lightning.Application.Options,
  platformSettings: PlatformSettings,
  appData: AppData
) {
  return Launch(LandingPage, appSettings, platformSettings, appData);
}
