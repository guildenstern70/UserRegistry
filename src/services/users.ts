/**
 *  UserRegistry
 *  A web template for user management for Svelte
 *  Copyright (c) 2023 Alessio Saltarin
 *  ISC License - see LICENSE
 */

import { Hasher } from './hasher';
import type { User } from '../models/user';
import { UsersRepository } from '../repositories/users';

/**
 * Users Service class
 */
export class UsersService {

    public static async createNormalUser(username: string,
                                        password: string,
                                        name: string,
                                        surname: string): Promise<boolean> {
        return await UsersService.createUser(username, password, name, surname, 'users');
    }

    public static async createAdminUser(username: string,
                                         password: string,
                                         name: string,
                                         surname: string): Promise<boolean> {
        return await UsersService.createUser(username, password, name, surname, 'admin');
    }


    private static async createUser(username: string,
                                   password: string,
                                   name: string,
                                   surname: string,
                                   group: string): Promise<boolean> {
        // Username should be unique
        // Check if username is already present
        const usersRepo = new UsersRepository();

        const existingUser = await usersRepo.getUser(username);
        if (existingUser) {
            console.warn(`User ${existingUser} already exists`);
            return false;
        }

        const hashedPassword = await Hasher.hashPassword(password);
        const user: User = {
            username: username,
            name: name,
            surname: surname,
            password: hashedPassword,
            creation_date: new Date(),
            group: group
        };
        return await usersRepo.addUser(user);

    }

}
