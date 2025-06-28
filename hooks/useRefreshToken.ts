import { API_LANG, API_VERSION } from "@/constants/config";
import useGlobalStore from "../stores/globalStore";
import { useAuthContext } from "@/context/auth/authContext";

interface Session {
  access_token: string;
  refresh_token: string;
  expire: string;
  refresh_expire: string;
}
interface DataResponse {
  code: number;
  data: {
    session: Session;
  };
}

interface RegeneratedTokens {
  access_token: string;
}

const useRefreshToken = (): (() => Promise<RegeneratedTokens | undefined>) => {
  const { regenerateTokens, session, user, logoutUser } = useAuthContext();
  const version = API_VERSION;
  const lang = API_LANG;
  const serverUrl = useGlobalStore((state) => state.serverUrl);

  return async (): Promise<RegeneratedTokens | undefined> => {
    try {
      if (!session || !user) {
        throw new Error("No session or user data available for token refresh.");
      }
      const response = await fetch(`${serverUrl}/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          Userid: `${user.id}`,
        },
        body: JSON.stringify({
          refresh_token: session.refresh_token,
        }),
      });

      const data: DataResponse = await response.json();

      if (response.ok && data.code === 200) {
        const newSession = data.data.session;
        regenerateTokens(
          newSession.access_token,
          newSession.refresh_token,
          newSession.expire,
          newSession.refresh_expire,
        );

        return {
          access_token: newSession.access_token,
        };
      } else {
        console.error("Failed to refresh token:", data);
        await logoutUser();
        return undefined;
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      await logoutUser();
      return undefined;
    }
  };
};

export default useRefreshToken;
