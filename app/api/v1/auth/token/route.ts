import { hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

import prisma from "@/prisma/prisma";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        // Check if password matches email's encrypted password
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid Email' }, { status: 400 });
        }

        const encryptedPassword = hashSync(password, 10);

        if (user.password !== encryptedPassword) {
            return NextResponse.json({ message: 'Invalid Password' }, { status: 400 });
        }

        if (!process.env.JWT_SECRET) {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const ret = NextResponse.json({ message: 'Token successfully created' }, { status: 201 });
        ret.cookies.set('token', token);
        return ret;


    } catch (error) {
        return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
}