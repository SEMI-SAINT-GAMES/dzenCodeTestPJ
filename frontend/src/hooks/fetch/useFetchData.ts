import { useState, useEffect } from "react";
import {IPage} from "../../interfaces/pageInterface.ts";
import {IRes} from "../../services";

const useFetchData = <T>(page: number, fetchService: (page: number) => IRes<IPage<T>>) => {
    const [pageData, setPageData] = useState<IPage<T> | null>(null);
    const [items, setItems] = useState<T[]>([]);

    const fetchItems = async () => {
        try {

            const response = await fetchService(page);
            if (response.data.results && Array.isArray(response.data.results)) {
                setPageData(response.data);
                setItems(response.data.results);
            } else {
                setPageData(null);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [page]);

    return { pageData, items, setItems };
};

export default useFetchData;