import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    // Note: Get the initial data from the JSON /src/data/data.json file
    const jsonDirectory = path.join(process.cwd(), 'src/data');

    try {
        const fileContents = await fs.readFile(path.join(jsonDirectory, 'data.json'), 'utf8');
        const data = JSON.parse(fileContents);

        // Return a Response object
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'An unknown error occurred' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
};
