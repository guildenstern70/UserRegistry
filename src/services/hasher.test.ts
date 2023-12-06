/**
 *  User Registry
 *  A web template for user management for Svelte
 *  Copyright (c) 2023 Alessio Saltarin
 *  ISC License - see LICENSE
 */

import { describe, it, expect } from 'vitest';
import { Hasher } from "./hasher";

describe('Registered users', () => {

    it('should be able to hash a password', async () => {
        const hashedPassword = await Hasher.hashPassword('test');
        console.log('Hash > ' + hashedPassword);
        expect(hashedPassword).not.toBeUndefined();
    });

    it('should be able to check a password', async () => {
        const hashedPassword = await Hasher.hashPassword('mariah');
        console.log('Hash > ' + hashedPassword);
        expect(hashedPassword).not.toBeUndefined();
        const check = await Hasher.checkPassword('mariah', hashedPassword);
        expect(check).toBeTruthy();
    });

});
