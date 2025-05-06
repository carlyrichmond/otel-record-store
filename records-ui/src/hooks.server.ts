import type { Handle } from '@sveltejs/kit';
import { Telemetry } from '$lib/telemetry/node.instrumentation';

export const handle: Handle = async ({ event, resolve }) => {
	//Telemetry.getInstance();
	return resolve(event);
};