import { useState, useEffect } from "react";
import {IPage} from "../../interfaces/pageInterface.ts";
import {IRes} from "../../services";

const useFetchData = <T>(page: number, fetchService: (page: number, ordering?: string) => IRes<IPage<T>>, ordering?:string) => {
    const [pageData, setPageData] = useState<IPage<T> | null>(null);
    const [items, setItems] = useState<T[]>([]);

    const fetchItems = async () => {
        try {
            let response
            if (ordering){
                response = await fetchService(page, ordering);
            }else {
                response = await fetchService(page);
            }
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
    }, [page, ordering]);

    return { pageData, items, setItems };
};

export default useFetchData;