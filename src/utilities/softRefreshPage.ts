import { goto } from '$app/navigation';

export const softRefreshPage = async (query: URLSearchParams) => {
	const options = {
		keepFocus: true,
		noScroll: true,
		replaceState: true
	};
	goto(`?${query.toString()}`, options);
};
