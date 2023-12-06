/**
 *  User Registry
 *  A web template for user management for Svelte
 *  Copyright (c) 2023 Alessio Saltarin
 *  ISC License - see LICENSE
 */

import { describe, expect, it } from 'vitest';
import { UsersRepository } from "./users";
import { UsersService } from '../services/users';

describe('Registered users', () => {
    const usersRepo = new UsersRepository();

    it('should be able to check if the test user exists', async () => {
        const user = await usersRepo.getUser("test");
        console.log("User: " + JSON.stringify(user));
        if (user) {
            expect(user.username).toBe("test");
        } else {
            const added = await UsersService.createNormalUser(
                "test",
                "the_test_password",
                "Test",
                "User"
            )
            expect(added).toBeTruthy();
        }
    });

    it('should be able to add a new user and then delete it', async () => {
        const user = {
            username: "add_user_test",
            name: "Add Test",
            surname: "User",
            password: "380831084018102894102",
            creation_date: new Date(),
            group: "users"
        };
        const added = await usersRepo.addUser(user);
        expect(added).toBeTruthy();
        const deleted = await usersRepo.deleteUser("add_user_test");
        expect(deleted).toBeTruthy();
    });

    it('should be able to get existing users', async () => {
        const users = await usersRepo.getUsers();
        console.log("Users: " + JSON.stringify(users));
        if (users) {
            expect(users.length).toBeGreaterThan(0);
        }
    });

    it('should be able to get a user by username', async () => {
        const user = await usersRepo.getUser("test");
        console.log("User: " + JSON.stringify(user));
        expect(user).not.toBeUndefined();
    });

    it('should be able to check username and password', async () => {
        const user = await usersRepo.getUser("test");
        console.log("User: " + JSON.stringify(user));
        expect(user).not.toBeUndefined();
        if (user) {
            const check = await usersRepo.checkUsernameAndPassword(user.username, 'the_test_password');
            expect(check).toBeTruthy();
        }
    });

});

