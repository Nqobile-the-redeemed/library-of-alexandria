import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCopy } from '../copiesSlice';
import "../../../app.css"


const NewCopyForm = ({ book, modalState, setModalState }) => {


    const [state, setState] = useState('');
    const [issueId, setIssueId] = useState('');
    const [notes, setNotes] = useState('');

    
    const newCopy = {
        state: state,
        issueID: issueId,
        notes: notes,
        availability: "Available",
        book: book._id
    }

    //The variouse imports
    const dispatch = useDispatch();

    const handleSaveCopy = () => {

        console.log(newCopy);


        dispatch(createCopy(newCopy))
        .then((response) => {
            console.log(response);
            setModalState(false);
        }).catch((error) => {
            console.error('Error creating copy:', error);
            // You can also show an error message to the user if needed.
        });

       


    }


    if (!modalState) return null;


    return ReactDom.createPortal(
        <>
            <div className="overlay-styles" />
            <div className="modal-styles">

                <div>
                    NewCopyForm
                    <button onClick={() => setModalState(false)}>Close</button>
                </div>
                
                <div>

                    <input 
                        type="text" 
                        placeholder="state" 
                        value = {state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="issue ID" 
                        value = {issueId}
                        onChange={(e) => setIssueId(e.target.value)}
                    />
                    <input 
                        type="textarea"    
                        placeholder="notes" 
                        value = {notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                
                </div>
                <div>
                    <button onClick={handleSaveCopy} >Save</button>
                </div>
            </div>
            
        </>,
    document.getElementById('portal')
    )
}

export default NewCopyForm