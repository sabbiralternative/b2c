import axios from "axios";
import { API } from "../api";
import handleRandomToken from "./handleRandomToken";
import handleEncryptData from "./handleEncryptData";

const handleNavigateNewTab = async (casinoType, casino, token) => {
  if (casinoType === "aura") {
    const generatedToken = handleRandomToken();
    const encryptedData = handleEncryptData({
      eventId: casino?.eventId,
      eventTypeId: casino?.eventTypeId,
      token: generatedToken,
    });

    try {
      const res = await axios.post(API.accessToken, encryptedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res?.data;
      if (data.success) {
        window.open(data?.result?.url, "_blank");
      }
    } catch (error) {
      console.error("Error opening casino game:", error);
    }
  }
};

export default handleNavigateNewTab;
