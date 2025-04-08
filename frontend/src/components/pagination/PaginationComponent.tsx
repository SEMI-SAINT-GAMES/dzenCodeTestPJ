import React, {ChangeEvent, FC, PropsWithChildren} from 'react';
import {Pagination} from "@mui/material";
interface IProps extends PropsWithChildren{
    pagesCount: number;
    page: number;
    handleChangePage:(event: ChangeEvent<unknown>, page:number) => void;
    
}
const PaginationComponent:FC<IProps> = ({pagesCount, page, handleChangePage}) => {
    return (
        <div className='paginationDiv'>
            <Pagination count={pagesCount} page={page} onChange={handleChangePage} shape="rounded"
                        color="primary"/>
        </div>
    );
};

export default PaginationComponent