import { grassImg, dirtImg, logImg, glassImg, woodImg } from './images';
import { NearestFilter, RepeatWrapping, TextureLoader } from 'three';

const groundTexture = new TextureLoader().load(grassImg);
const grassTexture = new TextureLoader().load(grassImg);
const dirtTexture = new TextureLoader().load(dirtImg);
const logTexture = new TextureLoader().load(logImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);

[
	groundTexture,
	grassTexture,
	dirtTexture,
	logTexture,
	glassTexture,
	woodTexture,
].forEach(element => {
	element.wrapS = RepeatWrapping;
	element.wrapT = RepeatWrapping;
	element.magFilter = NearestFilter;
});

export {
	groundTexture,
	grassTexture,
	dirtTexture,
	logTexture,
	glassTexture,
	woodTexture,
};
