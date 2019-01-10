import { CLEAR_ERRORS } from './types';

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
