export const byteSize = (str: string): number => new Blob([str]).size || 0;
