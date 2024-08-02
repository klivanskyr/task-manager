import { NextRequest, NextResponse } from "next/server";

import * as jwt from "jsonwebtoken";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const authHeader = request.headers.get('Authorization');

        if (!authHeader) {
            return NextResponse.json({ message: 'No Authorization Provided' }, { status: 400 });
        }

        //strip bearer from token
        const token = authHeader.split(' ')[1];

        if (!token) {
            return NextResponse.json({ message: 'Invalid Authorization Format. Bearer Token Needed' }, { status: 400 });
        }

        //verify token
        if (!process.env.JWT_SECRET) {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }

        if (jwt.verify(token, process.env.JWT_SECRET)) {
            return NextResponse.json({ message: 'Token is valid' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Token is invalid' }, { status: 401 });
        }

    } catch (error) {
        return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
}