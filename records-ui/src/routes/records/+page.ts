import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    try {
        const response = await fetch(`http://localhost:8080/records`);
        const records = await response.json();
        return { records: records };
    } catch (e) {
        console.error(e);
        return { error: '⚠️ Unable to obtain records' };
    }
}