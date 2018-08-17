import { GameSubLevel } from "./gameSubLevel.model";
export interface GameLevel {
    id: number;
    name: string;
    value: number;
    hasSubLevel: boolean;
    subLevel?: GameSubLevel;
}
