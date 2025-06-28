// useTokenExpiration.ts

import {useMemo} from 'react';

interface TokenExpirationStatus {
  isTokenExpired: boolean;
  isRefreshTokenExpired: boolean;
}

function useTokenExpiration(
  expire: Date | string | number,
  refreshExpire: Date | string | number,
): TokenExpirationStatus {
  const isTokenExpired = useMemo(() => {
    const expireTimestamp = new Date(expire).getTime();
    return Date.now() > expireTimestamp;
  }, [expire]);

  const isRefreshTokenExpired = useMemo(() => {
    const refreshExpireTimestamp = new Date(refreshExpire).getTime();
    return Date.now() > refreshExpireTimestamp;
  }, [refreshExpire]);

  return {isTokenExpired, isRefreshTokenExpired};
}

export default useTokenExpiration;
