import { User } from './user';
import { IP } from './ip';
import { Game1 } from './game1';
import { Game7 } from './Vegas-Baccarat';
import { MemberIP } from './memberIP';

export const API = {
  ...User,
  ...IP,
  ...Game1,
  ...Game7,
  ...MemberIP
};
