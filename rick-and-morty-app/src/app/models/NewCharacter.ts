export interface NewCharacter {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    origin: { url: string, name: string };
    location: { url: string, name: string; };
    episode: string[];
    url: string;
}