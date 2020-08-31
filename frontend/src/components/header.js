import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/actions';

function Header({ history, location }) {

    const [isOpen, setOpen] = useState(false);
    const { notification } = useSelector(state => state.notificationDetails);
    const { user } = useSelector(state => state.userDetails);

    let filterNotifications = notification.filter(nty => !nty.isRead && user._id === nty.owner);

    const dispatch = useDispatch()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
                <ModalHeader toggle={() => setOpen(false)}>Notifications</ModalHeader>
                <ModalBody>
                    <div className="list-group">
                        {filterNotifications.map((notification, index) => <div className="list-group-item"> {index+1} {' '} <b>{notification.notification}</b> </div>)}
                    </div>
                </ModalBody>
            </Modal>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        <Link className="nav-link" to='/dashboard'>Form</Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/pending' ? 'active' : ''}`}>
                        <Link className="nav-link" to='/pending'>Pending</Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/approved' ? 'active' : ''}`}>
                        <Link className="nav-link" to='/approved'>Approved</Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/rejected' ? 'active' : ''}`}>
                        <Link className="nav-link" to='/rejected'>Rejected</Link>
                    </li>
                </ul>
            </div>
            <form className="form-inline">
                <ul className="navbar-nav" title="Notifications">
                    <li className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`}>
                        <i style={{ cursor: 'pointer', color: filterNotifications.length ? 'red' : null }} className="fa fa-bell nav-link" aria-hidden="true" onClick={() => setOpen(true)}></i>
                    </li>
                </ul>
                <button className="btn btn-outline-danger my-2 my-sm-0" onClick={() => { dispatch(removeUser()); history.push('/') }}> Logout <i className="fa fa-sign-out" aria-hidden="true"></i></button>
            </form>
        </nav>
    );
}

export default withRouter(Header);