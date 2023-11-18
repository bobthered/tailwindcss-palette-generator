import colorNamer from 'color-namer';

export const randomColor = () => {
	const randomHex = [...Array(3)]
		.map((_) =>
			Math.floor(Math.random() * 256)
				.toString(16)
				.padStart(2, '0')
		)
		.join('');
	const {
		ntc: [closest]
	} = colorNamer(randomHex);
	const { hex, name } = closest;
	return { hex, name: name.toLowerCase().replace(/\s/g, '-') };
};
