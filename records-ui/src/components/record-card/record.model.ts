export type format = "CD" | "LP" | "DD";

export type Record = {
    title: string;
    artist: string;
    imagePath: string;
    formats: format[]
}