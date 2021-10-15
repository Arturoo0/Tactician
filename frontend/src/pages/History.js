
import React, { useState, useEffect } from 'react';
import { get } from '../utils/baseRequest';
import { Pagination } from 'react-bootstrap';

const History = () => {
    const perPage = 10; 
    const pageRange = 5;
    const [numberOfPages, setNumberOfPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageHistory, setCurrentPageHistory] = useState(null);

    useEffect(async () => {
        const response = await get(`/puzzles/number-of-history-pages/${perPage}`, {}); 
        const {
            pages
        } = response.data;
        setNumberOfPages(pages);
    });

    useEffect(async () => {
        const response = await get(`/puzzles/history-page/${1}/${perPage}`, {});
        setCurrentPageHistory(response);
    }, [currentPage]);

    const renderPages = () => {
        const pages = [];
        for (let i = 0; i < numberOfPages; i++){
            pages.push(<Pagination.Item onClick={() => {setCurrentPage(i + 1)}}>{i + 1}</Pagination.Item>);
            if (pages.length > pageRange) break;
        }
        return pages;
    };

    const generateHistoryPage = () => {
        if (currentPageHistory === null || currentPageHistory.length === 0){
            return (
                <div>No game history available</div>
            );
        }
        const res = currentPageHistory.data.current_page_games.map(puzzle =>
            <li>Testing</li>
        );
        return res;
    };

    return (
        <div style={{color: 'white'}}>
        <div>
            <ul>
                {generateHistoryPage()}
            </ul>
        </div>
        <Pagination>
            <Pagination.Prev />
                {renderPages()}
            <Pagination.Next />
        </Pagination>

        </div>
    );
};

export default History;