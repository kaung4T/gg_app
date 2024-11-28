import { User } from './user';
import { IP } from './ip';
import { Game1 } from './game1';
import { GameVegasBaccarat } from './Vegas-Baccarat';
import { MemberIP } from './memberIP';

export const API = {
  ...User,
  ...IP,
  ...Game1,
  ...GameVegasBaccarat,
  ...MemberIP
};
