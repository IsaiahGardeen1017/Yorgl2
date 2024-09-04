export type Album = {
    href: string;
    id: string;
    images: {
        url: string;
        width: number;
        height: number;
    }[];
    name: string;
    releaseDate: string;
}