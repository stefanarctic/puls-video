import { SCENE_DURATIONS, TIMELINE } from "../constants";

export type SceneKey = keyof typeof SCENE_DURATIONS;

export const getSceneStart = (scene: SceneKey) => TIMELINE[scene];

export const getSceneDuration = (scene: SceneKey) => SCENE_DURATIONS[scene];

export const sceneKeys = Object.keys(SCENE_DURATIONS) as SceneKey[];
