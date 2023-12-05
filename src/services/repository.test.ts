/**
 *  User Registry
 *  A web template for user management for Svelte
 *  Copyright (c) 2023 Alessio Saltarin
 *  ISC License - see LICENSE
 */

import { describe, it, expect } from 'vitest';
import { Repository } from "./repository";

describe('Registered users', () =>
{
  const repositoryService = new Repository();
  it('should be able to get existing users', async () => {
    const users = await repositoryService.getUsers();
    console.log("Users: " + JSON.stringify(users));
    if (users) {
      expect(users.length).toBeGreaterThan(0);
    }
  });

});

