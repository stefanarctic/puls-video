import { SCENE_DURATIONS, TIMELINE } from "../constants";
import type { SlideKey } from "../presentation/slideData";

export type SceneKey = SlideKey;

export const getSceneStart = (scene: SceneKey) => TIMELINE[scene];

export const getSceneDuration = (scene: SceneKey) => SCENE_DURATIONS[scene];

export const sceneKeys = Object.keys(SCENE_DURATIONS) as SceneKey[];
