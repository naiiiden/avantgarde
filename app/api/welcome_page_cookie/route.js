import { cookies } from 'next/headers'

export async function POST() {
    cookies().set('splashShown', 'true');
    return new Response('Cookie set', { status: 200 });
}