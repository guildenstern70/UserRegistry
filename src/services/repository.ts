/**
 *  Repository
 *  A web template for user management for Svelte
 *  Copyright (c) 2023 Alessio Saltarin
 *  ISC License - see LICENSE
 */

import type { Query, QuerySuccess, QueryValue } from "fauna";
import { Client, fql,  } from "fauna";
import type { FaunaUsers, User } from "../model/user";

/**
 * Data Repository class
 */
export class Repository {
  public readonly faunaClient: Client;

  /**
   * Repository
   */
  constructor() {
    this.faunaClient = new Client({});
  }

  async getUsers(): Promise<User[] | undefined> {

    let foundUsers: User[] | undefined;

    try {
      const all_users_query: Query = fql`users.all()`;
      const all_users: QuerySuccess<QueryValue> = await this.faunaClient.query(all_users_query);
      if (all_users != null && all_users.data != null) {
          const all_users_data: FaunaUsers = all_users.data as FaunaUsers;
          const {data} = all_users_data;
          foundUsers = data as User[];
          console.log(JSON.stringify(foundUsers));
      }
    } catch (error) {
      console.error(error);
    }

    return foundUsers;

  }
}


