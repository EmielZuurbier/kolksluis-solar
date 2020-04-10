/**
 * @module		./utilities/audio.js
 */

import { hasFeatures } from '../utilities/tools.js';

/**
 * @function	isWebAudioAPISupported
 * @returns		{Boolean}
 */
export const isWebAudioAPISupported = () => hasFeatures('Web Audio API');

/**
 * @function    fetchAudioFiles
 * @param       {AudioContext} audioContext An AudioContext instance.
 * @param       {...string} urls Paths to the files to be downloaded.
 */
export const fetchAudioFiles = (audioContext, ...urls) => Promise.all(urls.map(async (url) => {
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();
	const decodedData = await audioContext.decodedData(buffer);
	return decodedData;
}));

/**
 * @function	distortionCurve
 * @param 		{number} amount 
 * @returns		{Float32Array}
 */
export const distortionCurve = amount => {
    const k = typeof amount === 'number' ? amount : 50;
    const nSamples = 44100;
    let curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    let i = 0;
    let x;
    for ( ; i < nSamples; ++i ) {
        x = i * 2 / nSamples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
};

/**
 * Creates an HTMLAudioElement instance on which to sequently play a list
 * of audio files on after another.
 * 
 * @function    createSequentialAudioPlayer
 * @param       {...string} files 
 * @returns     {HTMLAudioElement}
 */
export const createSequentialAudioPlayer = (...files) => {
    const audio = new Audio();
    let fileIndex = 0;
    audio.src = files[fileIndex];
    audio.addEventListener('ended', () => {
      fileIndex++;
      if (fileIndex >= files.length) return;
      audio.src = files[fileIndex];
      audio.play();
    });
    return audio;
};