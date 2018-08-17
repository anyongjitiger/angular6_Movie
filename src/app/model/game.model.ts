import { GameLevel } from "./gameLevel.model";
export interface Game{
    id: number;
    name: string;
    hasLevel: boolean;
    rank?: number;
    level?: GameLevel;
    order?: number;
}
