/**
 *  UserRegistry
 *  A web template for user management for Svelte
 *  Copyright (c) 2023 Alessio Saltarin
 *  ISC License - see LICENSE
 */

import type { Query, QuerySuccess, QueryValue } from "fauna";
import { Client, fql,  } from "fauna";
import type { FaunaUsers, User } from "../models/user";
import { Hasher } from '../services/hasher';

/**
 * <Users> Repository class
 */
export class UsersRepository {
  public readonly faunaClient: Client;

  /**
   * Repository
   */
  constructor() {
    this.faunaClient = new Client({});
  }

  async checkUsernameAndPassword(username: string, password: string): Promise<boolean> {
    const user = await this.getUser(username);
    const hashedPassword = await Hasher.hashPassword(password);
    if (user) {
      return user.password === hashedPassword;
    }
    return false;
  }

  async addUser(user: User): Promise<boolean> {

    const create_user_command: Query = fql`users.create(${user})`;
    try {
      const queryRun: QuerySuccess<QueryValue> = await this.faunaClient.query(create_user_command);
      if (queryRun != null) {
        console.log(queryRun);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;

  }

  async deleteUser(username: string): Promise<boolean> {
    const existingUser = await this.getUser(username);
    if (existingUser) {
      const userId = existingUser.id;
      if (userId == null) {
        return false;
      }
      const delete_user_command: Query = fql`users.byId(${userId})!.delete()`;
      try {
        const queryRun: QuerySuccess<QueryValue> = await this.faunaClient.query(delete_user_command);
        if (queryRun != null) {
          console.log(queryRun);
          return true;
        }
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  }

  async getUser(username: string): Promise<User | undefined> {
    let foundUser: User | undefined;
    const user_by_username_query: Query = fql`users.where(.username == ${username})`;
    const faunaUsers: FaunaUsers | undefined = await this.runUsersQuery(user_by_username_query);
    if (faunaUsers != null && faunaUsers.data != null) {
      const {data} = faunaUsers;
      const foundUsers: User[] = data as User[];
      if (foundUsers.length > 0) {
        foundUser = foundUsers[0];
      }
    }
    return foundUser;
  }

  async getUsers(): Promise<User[] | undefined> {

    let foundUsers: User[] | undefined;
    const all_users_query: Query = fql`users.all()`;
    const faunaUsers: FaunaUsers | undefined = await this.runUsersQuery(all_users_query);
    if (faunaUsers != null && faunaUsers.data != null) {
      const {data} = faunaUsers;
      foundUsers = data as User[];
      console.log(JSON.stringify(foundUsers));
    }
    return foundUsers;

  }

  private async runUsersQuery(query: Query): Promise<FaunaUsers | undefined> {
    let faunaUsers: FaunaUsers | undefined = undefined
    try {
      const queryRun: QuerySuccess<QueryValue> = await this.faunaClient.query(query);
      if (queryRun != null && queryRun.data != null) {
        faunaUsers = queryRun.data as FaunaUsers;
      }
    } catch (error) {
      console.error(error);
    }
    return faunaUsers;
  }
}


