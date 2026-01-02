import remoteConfig from "@react-native-firebase/remote-config";

export async function initRemoteConfig() {
  await remoteConfig().setDefaults({
    enableNewUI: false,
    maintenanceMode: false,
  });

  await remoteConfig().fetchAndActivate();
}

export function getEnableNewUI() {
  return remoteConfig()
    .getValue("enableNewUI")
    .asBoolean();
}

export function isMaintenanceMode() {
  return remoteConfig()
    .getValue("maintenanceMode")
    .asBoolean();
}
