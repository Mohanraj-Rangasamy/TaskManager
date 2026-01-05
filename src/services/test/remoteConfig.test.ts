import remoteConfig from "@react-native-firebase/remote-config";
import { initRemoteConfig, getEnableNewUI, isMaintenanceMode } from "../remoteConfig";

jest.mock("@react-native-firebase/remote-config", () => {
  const mockGetValue = jest.fn();
  const mockSetDefaults = jest.fn();
  const mockFetchAndActivate = jest.fn();

  const mockInstance = {
    setDefaults: mockSetDefaults,
    fetchAndActivate: mockFetchAndActivate,
    getValue: mockGetValue,
  };

  return jest.fn(() => mockInstance);
});

describe("Remote Config Service", () => {
  const mockRemoteConfig = remoteConfig() as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("initRemoteConfig", () => {
    it("should set default values and activate the config", async () => {
      mockRemoteConfig.setDefaults.mockResolvedValue(null);
      mockRemoteConfig.fetchAndActivate.mockResolvedValue(true);

      await initRemoteConfig();

      expect(mockRemoteConfig.setDefaults).toHaveBeenCalledWith({
        enableNewUI: false,
        maintenanceMode: false,
      });

      expect(mockRemoteConfig.fetchAndActivate).toHaveBeenCalledTimes(1);
    });
  });

  describe("getEnableNewUI", () => {
    it("should return true when enableNewUI is enabled in Firebase", () => {
      mockRemoteConfig.getValue.mockReturnValue({
        asBoolean: () => true,
      });

      const result = getEnableNewUI();

      expect(mockRemoteConfig.getValue).toHaveBeenCalledWith("enableNewUI");
      expect(result).toBe(true);
    });
  });

  describe("isMaintenanceMode", () => {
    it("should return false when maintenanceMode is disabled", () => {
      mockRemoteConfig.getValue.mockReturnValue({
        asBoolean: () => false,
      });

      const result = isMaintenanceMode();

      expect(mockRemoteConfig.getValue).toHaveBeenCalledWith("maintenanceMode");
      expect(result).toBe(false);
    });
  });
});