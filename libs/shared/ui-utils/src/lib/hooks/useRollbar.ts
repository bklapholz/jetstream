import { useEffect, useState } from 'react';
import Rollbar from 'rollbar';
import { Environment, UserProfileUi } from '@jetstream/types';

// Ensure rollbar is only initialized and configured once no matter how often hook is used
let _rollbar: Rollbar;
let _rollbarIsConfigured = false;
function getRollbarInstance(accessToken: string, environment: Environment, userProfile?: UserProfileUi) {
  const rollbar =
    _rollbar ||
    new Rollbar({
      accessToken,
      captureUncaught: true,
      captureUnhandledRejections: true,
      environment,
      autoInstrument: {
        // eslint-disable-next-line no-restricted-globals
        log: location.hostname !== 'localhost',
      },
      hostBlackList: ['localhost'],
    });
  if (!_rollbarIsConfigured && userProfile) {
    _rollbarIsConfigured = true;
    const { sub, email } = userProfile;
    rollbar.configure({
      payload: {
        person: {
          id: sub,
          email,
        },
      },
    });
  }
  _rollbar = rollbar;
  return rollbar;
}
// Environment
export function useRollbar(accessToken: string, environment: Environment, userProfile?: UserProfileUi) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [rollbar] = useState(() => getRollbarInstance(accessToken, environment, userProfile));

  useEffect(() => {
    if (rollbar && userProfile && !isConfigured) {
      getRollbarInstance(accessToken, environment, userProfile);
      setIsConfigured(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollbar, userProfile]);

  return rollbar;
}