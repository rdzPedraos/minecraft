import { useBox } from '@react-three/cannon';
import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import * as textures from '../images/textures';

export const Cube = ({ id, position, texture }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [ref] = useBox(() => ({
		type: 'Static',
		position,
	}));

	const activeTexture = textures[texture + 'Texture'];
	const [removeCube] = useStore(state => [state.removeCube]);

	return (
		<mesh
			onPointerMove={e => {
				e.stopPropagation();
				setIsHovered(true);
			}}
			onPointerOut={e => {
				e.stopPropagation();
				setIsHovered(false);
			}}
			onClick={e => {
				e.stopPropagation();
				if (e.altKey) {
					removeCube(id);
				}
			}}
			ref={ref}
		>
			<boxBufferGeometry attach='geometry' />
			<meshStandardMaterial
				color={isHovered ? 'grey' : 'white'}
				map={activeTexture}
			/>
		</mesh>
	);
};
