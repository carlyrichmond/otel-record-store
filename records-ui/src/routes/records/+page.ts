import type { PageLoad } from './$types';

import { logs, SeverityNumber } from '@opentelemetry/api-logs';
const logger = logs.getLogger('default', '1.0.0');

export const load: PageLoad = async ({ fetch }) => {
    try {
        const response = await fetch(`http://localhost:8080/records`);
        const records = await response.json();
        return { records: records };
    } catch (e) {
        logger.emit({
				severityNumber: SeverityNumber.ERROR,
				severityText: 'ERROR',
				body: { text: JSON.stringify(e) }
			});
        
        return { error: '⚠️ Unable to obtain records' };
    }
}