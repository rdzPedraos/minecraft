import grassImg from './grass.jpg';
import dirtImg from './dirt.jpg';
import logImg from './log.jpg';
import glassImg from './glass.png';
import woodImg from './wood.png';
import { NearestFilter, RepeatWrapping, TextureLoader } from 'three';

const groundTexture = new TextureLoader().load(grassImg);
const dirtTexture = new TextureLoader().load(dirtImg);
const logTexture = new TextureLoader().load(logImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);

[groundTexture, dirtTexture, logTexture, glassTexture, woodTexture].forEach(
	element => {
		element.wrapS = RepeatWrapping;
		element.wrapT = RepeatWrapping;
		element.magFilter = NearestFilter;
	}
);

export { groundTexture, dirtTexture, logTexture, glassTexture, woodTexture };
