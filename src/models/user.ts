/**
 *  User Registry
 *  A web template for user management for Svelte
 *  Copyright (c) 2023 Alessio Saltarin
 *  ISC License - see LICENSE
 */

export type User = {
  id?: string;
  username: string;
  name: string;
  surname: string;
  password: string;
  creation_date: object;
  group: string;
}

export type FaunaUsers = {
  data: User[];
}

export type FaunaUsersResponse = {
  [key: string]: FaunaUsers;
}
