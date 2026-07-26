export interface Element {
    id: string;

    name: string;

    description: string;

    // URL для отображения в UI
    mainReference: string | null;

    references: string[];

    // Имена файлов для backend
    mainReferenceFile: string | null;

    referenceFiles: string[];
}