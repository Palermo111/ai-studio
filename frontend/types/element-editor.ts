export interface LocalReference {
    id: string;

    preview: string;

    file?: File;
}

export interface ElementEditorData {
    name: string;

    description: string;

    mainReference: LocalReference | null;

    references: LocalReference[];

    removeMainReference: boolean;

    replaceReferences: boolean;
}