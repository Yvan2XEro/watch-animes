export function substring(str: string, size: number): string {
    return str.length < size ? str : str.substring(0, size) + '...';
}