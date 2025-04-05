import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        // Get the initial data from the JSON /src/data/data.json file
        const jsonDirectory = path.join(process.cwd(), 'src/data');
        const fileContents = await fs.readFile(path.join(jsonDirectory, 'data.json'), 'utf8');

        // Parse the JSON data
        const data = JSON.parse(fileContents);

        // Return the data as a JSON response
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // Handle errors (e.g., file not found, JSON parsing errors)
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}