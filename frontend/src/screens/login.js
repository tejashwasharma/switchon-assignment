import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, addData, setRequests } from '../redux/actions';
import { login, populate } from '../api';
import { join, heartbeat } from '../socket';

export default ({ history }) => {

    const dispatch = useDispatch();
    const { users, departments } = useSelector(state => state.userDetails)

    const initialValues = {
        username: '',
        password: ''
    }

    const validation = () => Yup.object().shape({
        username: Yup.string().required('Required!'),
        password: Yup.string().required('Required!')
    })

    const onSubmit = (values) => {
        login(values)
            .then((res) => {
                dispatch(addUser(res.user));
                dispatch(setRequests(res.requests));
                history.push('/dashboard');
                join(res.user);
                heartbeat();
            })
            .catch((err) => alert(err))
    }

    const popuplateData = () => {
        populate()
            .then((res) => dispatch(addData(res)))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        popuplateData();
    }, [])

    return (
        <div style={{ height: '100%' }} className="d-flex flex-column justify-content-center align-items-center" >
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={onSubmit}
            >
                {({ errors, values, handleChange, handleSubmit }) => (
                    <form style={{ border: '1px solid black', borderRadius: '10px', width: '30%' }} className='d-flex flex-column justify-content-center align-items-center py-5 px-5' onSubmit={handleSubmit}>
                        <h2><b>Login</b></h2>
                        <input className='form-control my-2' name='username' id='username' placeholder='User Id' type='username' onChange={handleChange} value={values.username} />
                        <span style={{ color: 'red' }}>{errors.username}</span>
                        <input className='form-control my-2' name='password' id='password' placeholder='Password' type='password' onChange={handleChange} value={values.password} />
                        <span style={{ color: 'red' }}>{errors.password}</span>
                        <button className='btn btn-primary w-100' type='submit'>Login <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                    </form>
                )}
            </Formik>
            <ul>
                {users && users.map((user, index) => <li key={index}>UserName: <b>{user.username}</b>, Password: <b>{user.password}</b>, Department: <b>{departments.find(dpt => dpt._id === user.department).name}</b> </li>)}
            </ul>
        </div>
    )
}