import { provideStore } from '@ngxs/store';
import { environment } from '@tracker/environments';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';

export const storeConfig = () =>
  provideStore(
    [],
    withNgxsReduxDevtoolsPlugin({
      disabled: !environment.production,
    }),
    withNgxsRouterPlugin(),
  );
