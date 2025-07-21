import type { Handle } from '@sveltejs/kit';
import { Telemetry } from '$lib/telemetry/node.instrumentation';

export const handle: Handle = async ({ event, resolve }) => {
	//Telemetry.getInstance();
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
		return new Response(null, { status: 204 }); // Return empty response with 204 No Content
	}

	return resolve(event);
};
