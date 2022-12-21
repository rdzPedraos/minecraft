import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { useKeyBoard } from '../hooks/useKeyboard';

const CHARACTER_SPEED_WALK = 3;
const CHARACTER_SPEED_RUN = 4;
const CHARACTER_JUMP_FORCE = 2.5;

export const Player = () => {
	const { moveBackward, moveForward, moveLeft, moveRight, run, jump } =
		useKeyBoard();
	const { camera } = useThree();
	const [ref, api] = useSphere(() => ({
		mass: 500,
		type: 'Dynamic',
		position: [0, 1, 0],
	}));

	const pos = useRef([0, 0, 0]);
	const vel = useRef([0, 0, 0]);

	// Almacenamos la ubicación y la velocidad de la esfera en todo momento:
	api.position.subscribe(p => {
		pos.current = p;
	});

	api.velocity.subscribe(v => {
		vel.current = v;
	});

	useFrame(() => {
		// La cámara sigue a la esfera:
		camera.position.copy(new Vector3(...pos.current));

		// Apuntamos a un lado dependiendo qué flechas tengamos presionadas
		const direction = new Vector3(
			(moveRight ? 1 : 0) - (moveLeft ? 1 : 0),
			0,
			(moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
		);

		// Movemos de forma escalada, dependiendo si correo o camina, y nos movemos en función de a dónde apunte la cámara.
		direction
			.normalize()
			.multiplyScalar(run ? CHARACTER_SPEED_RUN : CHARACTER_SPEED_WALK)
			.applyEuler(camera.rotation);

		// Asignamos la velocidad en los ejes correspondientes
		api.velocity.set(direction.x, vel.current[1], direction.z);

		// Si va a saltar
		if (jump && Math.abs(vel.current[1]) < 0.01) {
			api.velocity.set(vel.current[0], CHARACTER_JUMP_FORCE, vel.current[2]);
		}
	});

	return <mesh ref={ref} />;
};
