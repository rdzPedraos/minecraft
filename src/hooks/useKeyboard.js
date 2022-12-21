import { useEffect, useState } from 'react';

const ACTIONS_KEYBOARD_MAP = {
	KeyW: 'moveForward',
	KeyS: 'moveBackward',
	KeyA: 'moveLeft',
	KeyD: 'moveRight',
	ShiftLeft: 'run',

	Space: 'jump',
	Digit1: 'dirt',
	Digit2: 'glass',
	Digit3: 'grass',
	Digit4: 'log',
	Digit5: 'wood',
};

export const useKeyBoard = () => {
	const [actions, setActions] = useState({
		moveForward: false,
		moveBackward: false,
		moveLeft: false,
		moveRight: false,
		run: false,
		jump: false,

		dirt: false,
		grass: false,
		glass: false,
		wood: false,
		log: false,
	});

	useEffect(() => {
		const handleKeyDown = event => {
			const action = ACTIONS_KEYBOARD_MAP[event.code];

			if (action) {
				setActions(prevActions => ({
					...prevActions,
					[action]: true,
				}));
			}
		};

		const handleKeyUp = event => {
			const action = ACTIONS_KEYBOARD_MAP[event.code];

			if (action) {
				setActions(prevActions => ({
					...prevActions,
					[action]: false,
				}));
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	return actions;
};
