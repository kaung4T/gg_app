import { User } from './user';
import { IP } from './ip';
import { Game1 } from './game1';

export const API = {
  ...User,
  ...IP,
  ...Game1
};
