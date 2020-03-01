import { Guard, sleep } from '../reactRouterAdvance';

export class MockGuard implements Guard {
  canActivate: boolean;
  constructor(canActivate = true) {
    this.canActivate = canActivate;
  }
  async CanActivate(): Promise<boolean> {
    await sleep(200);

    return this.canActivate;
  }
}
