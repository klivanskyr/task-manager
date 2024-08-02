import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts";

import prisma from "@/prisma/prisma";

/**
 * @description Create a new user
 * @method POST
 * @param {string} name - User's name
 * @param {string} password - User's password
 * @param {string} email - User's email
 * @param {string?} phonenumber - User's phone number --optional
 * @returns {object} - Returns a message and the user's id
 * @throws {object} - Returns a message and a status code
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { name, password, email, phonenumber }: { name: string, password: string, email: string, phonenumber: string } = await request.json(); 

        if (!name || !password || !email) {
            return NextResponse.json({ message: 'Name, password and email are required' }, { status: 400 });
        }

        let data = {
            name,
            password: hashSync(password, 10),
            email,
            ...(phonenumber ? { phonenumber } : {})
        }

        const user = await prisma.user.create({ data });

        return NextResponse.json({ message: 'User successfully created', userId: user.id }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
}

/**
 * @description Get all users
 * @method GET
 * @returns {object} - Returns all users
 * @throws {object} - Returns a message and a status code
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json(users, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
}