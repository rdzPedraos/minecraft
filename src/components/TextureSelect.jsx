import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import * as images from '../images/images';
import { useKeyBoard } from '../hooks/useKeyboard';

export const TextureSelector = () => {
	const [visible, setVisible] = useState(false);
	const [texture, setTexture] = useStore(state => [
		state.texture,
		state.setTexture,
	]);

	useEffect(() => {
		const visibilityTimeout = setTimeout(() => {
			setVisible(false);
		}, 1000);
		setVisible(true);

		return () => clearTimeout(visibilityTimeout);
	}, [texture]);

	const { dirt, grass, glass, wood, log } = useKeyBoard();

	useEffect(() => {
		const options = {
			dirt,
			grass,
			glass,
			wood,
			log,
		};
		const selectedTexture = Object.entries(options).find(
			([texture, isEnabled]) => isEnabled
		);

		if (selectedTexture) {
			const [nameTexture] = selectedTexture;
			setTexture(nameTexture);
		}
	}, [dirt, grass, glass, wood, log]);

	return (
		<div className={`texture-selector ${visible ? '' : 'hidden'}`}>
			{Object.entries(images).map(([imgKey, img]) => {
				return (
					<img
						className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
						key={imgKey}
						src={img}
						alt={imgKey}
					/>
				);
			})}
		</div>
	);
};
