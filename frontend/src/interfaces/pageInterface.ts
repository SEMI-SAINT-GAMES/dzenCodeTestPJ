export interface IPage<T> {
    total_items: number;
    total_pages: number;
    prev: string | boolean;
    next: string | boolean;
    results: T[];
}