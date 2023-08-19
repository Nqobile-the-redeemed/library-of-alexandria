import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../userSlice';
import "../../../app.css"

const NewUserForm = ({ handleNewUserForm, user, userLoading, userError, newUserFormState, setNewUserFormState }) => {

    // The states to manage the form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [middleName, setMiddleName] = useState('');

    // The object to be sent to the backend
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: emailAddress,
        phoneNumber: phoneNumber,
        address: address,
        middleNames: middleName
    }

    const dispatch = useDispatch();

    // The function to handle the form submission
    const handleNewUserCreation = (e) => {
        e.preventDefault();
        dispatch(createUser(newUser));
        setNewUserFormState(false);
    }



    if(!newUserFormState) return null;


    return ReactDom.createPortal(
        <>
            <div className="overlay-styles" />
            <div className="modal-styles">

                <div>
                    NewUserForm
                    <button 
                        onClick={handleNewUserForm}
                    >Close</button>
                </div>

                <div className='input-boxes'>
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='middleName'>Middle Name</label>
                        <input
                            type='text'
                            id='middleName'
                            name='middleName'
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='emailAddress'>Email Address</label>
                        <input
                            type='text'
                            id='emailAddress'
                            name='emailAddress'
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input
                            type='text'
                            id='phoneNumber'
                            name='phoneNumber'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleNewUserCreation}
                        >Create User</button>
                    </div>
                </div>
            </div>
        </>,
    document.getElementById('portal')
    )
}

export default NewUserForm