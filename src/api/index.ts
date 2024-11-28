import { User } from './user';
import { IP } from './ip';
import { Game1 } from './game1';
import { GameVegasBaccarat } from './Vegas-Baccarat';
import { GameBaccarat7M } from './7M-BACCARAT';
import { MemberIP } from './memberIP';

export const API = {
  ...User,
  ...IP,
  ...Game1,
  ...GameVegasBaccarat,
  ...GameBaccarat7M,
  ...MemberIP
};
