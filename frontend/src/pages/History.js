
import React, { useState, useEffect } from 'react';
import { get } from '../utils/baseRequest';
import { Pagination } from 'react-bootstrap';

const History = () => {
    const perPage = 10; 
    const pageRange = 5;
    const [numberOfPages, setNumberOfPages] = useState();
    const [currentPage, setCurrentPage] = useState();

    useEffect(async () => {
        const response = await get(`/puzzles/number-of-history-pages/${perPage}`, {}); 
        const {
            pages
        } = response.data;
        setNumberOfPages(pages);
    });

    const renderPages = () => {
        const pages = [];
        for (let i = 0; i < numberOfPages; i++){
            pages.push(<Pagination.Item>{i + 1}</Pagination.Item>);
            if (pages.length > pageRange) break;
        }
        return pages;
    };

    return (
        <div style={{color: 'white'}}>

        <Pagination>
            <Pagination.Prev />
            {renderPages()}
            <Pagination.Next />
        </Pagination>

        </div>
    );
};

export default History;