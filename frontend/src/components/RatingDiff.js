
import React from 'react';
import { Toast, Badge } from 'react-bootstrap';
import { IoArrowDownOutline, IoArrowUpOutline, IoChevronForwardOutline } from "react-icons/io5";

const toastBodyStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
};

const toastContentStyling = {
    fontSize: '2rem',
    fontWeight: '600'
}

const RatingDiff = (props) => {
    return (
        <div>
            <Toast>
                <Toast.Header>
                    <strong className="me-auto">Puzzle ID: #{props.id}</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body style={toastBodyStyle}>
                    <div style={toastContentStyling}>{Math.round(props.rating)}</div>
                    <div style={{...toastContentStyling, ...toastBodyStyle}}><IoChevronForwardOutline /></div>
                    <div style={toastContentStyling}>{Math.round(props.rating + props.diff)}</div>  
                    <div style={{marginLeft: '6px'}}>
                        {
                            props.diff < 0 ?
                            <Badge bg='danger'>
                                <IoArrowDownOutline style={toastContentStyling}></IoArrowDownOutline>
                            </Badge>
                            :
                            <Badge bg='success'>
                                <IoArrowUpOutline style={toastContentStyling}></IoArrowUpOutline>
                            </Badge>
                        }
                    </div>
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default RatingDiff;