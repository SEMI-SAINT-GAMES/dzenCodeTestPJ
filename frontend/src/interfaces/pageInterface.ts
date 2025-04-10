export interface IPage<T> {
    current_page: number;
    total_items: number;
    total_pages: number;
    prev: string | boolean;
    next: string | boolean;
    results: T[];
}