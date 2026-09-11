export type format = "CD" | "LP" | "DD";

export type Record = {
    albumId: number;
    title: string;
    artist: string;
    imagePath: string;
    formats: format[]
}