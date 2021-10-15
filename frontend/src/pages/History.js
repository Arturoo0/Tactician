
import React, { useState, useEffect } from 'react';
import { get } from '../utils/baseRequest';
import { Pagination, Badge } from 'react-bootstrap';

const gameHistoryMainContainerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
};

const liHistoryContainerStyle = {
    listStyle: 'none',
    display: 'flex',
    padding: '0 3px',
    justifyContent: 'space-between'
}

const ulContainerStyle = {
    padding: '0 0',
    width: '100%',
    backgroundColor: 'white'
}

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
        const response = await get(`/puzzles/history-page/${currentPage}/${perPage}`, {});
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
            <li style={{color: 'white'}} style={liHistoryContainerStyle}>
                <div>
                    {
                        (puzzle.correct === true) ?
                            <Badge bg='success'>
                                Correct
                            </Badge>
                        :
                            <Badge bg='danger'>
                                Incorrect
                            </Badge>
                    }
                </div>
                <div>
                    <Badge bg='info'>
                        Puzzle Id
                    </Badge> {puzzle.puzzle_id}
                </div>
                <div>
                    {puzzle.time_elapsed_in_seconds}
                </div>
                <hr />
            </li>
        );
        return res;
    };

    return (
        <div style={gameHistoryMainContainerStyle}>
            <div>
                <ul style={ulContainerStyle}>
                    {generateHistoryPage()}
                </ul>
            </div>
            <div>
                <Pagination>
                    <Pagination.Prev />
                        {renderPages()}
                    <Pagination.Next />
                </Pagination>
            </div>
        </div>
    );
};

export default History;