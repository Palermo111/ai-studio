export interface Element {
    id: string;

    name: string;

    description: string;

    mainReference: string | null;

    references: string[];
}