import {Role} from './role.model';

export interface Token {
  token: string;
  username?: string;
  roles?: Array<Role>;
}
