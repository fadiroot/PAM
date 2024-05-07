// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthGuard } from '@nestjs/passport';
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
