export const changePage = ({ state, updateState, page, changeState }) => {
	const newState = Object.keys(state).reduce((result, key) => ({
		...result,
		[key]: typeof state[key] === 'string' ? '' : state[key],
	}), {});

	updateState(newState);
	changeState(page);
};