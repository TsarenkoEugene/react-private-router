import { Guard } from '../reactRouterAdvance';

import { sleep } from '../reactRouterAdvance';

export class TestGuard implements Guard {
  async CanActivate(): Promise<boolean> {
    await sleep(200);

    return true;
  }
}
