import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import * as images from '../images/textures';
import { useKeyBoard } from '../hooks/useKeyboard';

export const TextureSelector = () => {
	const [visible, setVisible] = useState(false);
	const [texture, setTexture] = useStore(state => [
		state.texture,
		state.setTexture,
	]);

	const { dirt, grass, glass, wood, log } = useKeyBoard();

	useEffectffect(() => {
		const options = {
			dirt,
			grass,
			glass,
			wood,
			log,
		};

		const [selectedTexture] = Object.entries(options).find(
			([texture, isEnabled]) => isEnabled
		);

		if (selectedTexture) {
			setTexture(selectedTexture);
		}
	}, [dirt, grass, glass, wood, log]);
};
