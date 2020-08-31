import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { Formik } from 'formik'
import * as Yup from 'yup';
import { raiseRequest } from '../socket';
import { useSelector } from 'react-redux';

export default ({ history }) => {

    const { userDetails } = useSelector(state => state);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        return () => setSuccess(false)
    }, [])

    const initialValues = {
        createdBy: userDetails.user.username,
        department: '',
        user: '',
        message: ''
    }

    const validation = () => Yup.object().shape({
        department: Yup.string().required('Required!'),
        user: Yup.string().required('Select User!'),
        message: Yup.string().required('Required!')
    })

    const onSubmit = (values) => {
        values.owner = userDetails.user._id;
        raiseRequest(values);
        setSuccess(true);
    }

    return (
        <div>
            <Header />
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={onSubmit}
                >
                    {({ errors, values, handleChange, handleSubmit }) => {

                        let filteredUsers = userDetails.users.filter((usr) => { return usr.department === values.department && usr.username !== userDetails.user.username ? usr : null })

                        return (
                            <form style={{ border: '1px solid black', borderRadius: '10px', width: '30%' }} className='d-flex flex-column justify-content-center align-items-center py-5 px-5' onSubmit={handleSubmit}>
                                <h2><b>Create New Request</b></h2>
                                Request By:
                                <input className='form-control my-2' name='createdBy' id='createdBy' placeholder='Request Raised By' onChange={handleChange} disabled={true} value={values.createdBy} />
                                Department:
                                <select
                                    defaultValue={values.department}
                                    id='department'
                                    className='form-control'
                                    onChange={handleChange}
                                >
                                    <option value={undefined}> Select a department </option>
                                    {userDetails.departments.map((dpt, index) => {
                                        if (dpt._id !== userDetails.user.department) {
                                            return (<option key={index} value={dpt._id}>{dpt.name}</option>)
                                        }
                                    })}
                                </select>
                                <span style={{ color: 'red' }}>{errors.department}</span>
                                User:
                                <select
                                    defaultValue={values.user}
                                    className='form-control'
                                    onChange={handleChange}
                                    id='user'
                                >
                                    <option value={undefined}> Select a user </option>
                                    {filteredUsers.map((usr, index) => <option key={index} value={usr._id}>{usr.username}</option>)}
                                </select>
                                <span style={{ color: 'red' }}>{errors.user}</span>
                                Message:
                                <input className='form-control my-2' name='message' id='message' placeholder='Message' onChange={handleChange} value={values.message} />
                                <span style={{ color: 'red' }}>{errors.message}</span>
                                {
                                    success ?
                                        <span style={{ color: 'green' }}>Request raised successfully! <i className="fa fa-check-circle" aria-hidden="true"></i></span>
                                        :
                                        <button className='btn btn-primary w-100' type='submit'>Raise Request</button>
                                }
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    )
}