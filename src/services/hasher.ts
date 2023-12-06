/**
 *  UserRegistry
 *  A web template for user management for Svelte
 *  Copyright (c) 2023 Alessio Saltarin
 *  ISC License - see LICENSE
 */

import { createHash } from "crypto";

/**
 * Hasher class
 */
export class Hasher {

    public static async hashPassword(password: string): Promise<string> {
        return createHash('sha256').update(password).digest('hex');
    }

    public static async checkPassword(password: string, hash: string): Promise<boolean> {
        const hashedPassword = await Hasher.hashPassword(password);
        return hashedPassword === hash;
    }

    private static sha256(message: string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        return window.crypto.subtle.digest('SHA-256', data);
    }

}


