import { provideStore } from '@ngxs/store';
import { environment } from '@tracker/environments';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { AuthState } from '@tracker/apps/track-ui/stores';

export const storeConfig = () =>
  provideStore(
    [AuthState],
    withNgxsReduxDevtoolsPlugin({
      disabled: environment.production,
    }),
    withNgxsRouterPlugin(),
  );
