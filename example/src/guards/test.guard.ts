import { Guard } from '../reactRouterAdvance';

const sleep = (t: number) => new Promise(res => setTimeout(() => res(), t));

export class TestGuard implements Guard {
  async CanActivate(): Promise<boolean> {
    await sleep(2000);

    return true;
  }
}
