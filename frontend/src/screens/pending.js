import React from 'react';
import Header from '../components/header';
import moment from 'moment';
import { updateRequest } from '../socket';
import { useSelector } from 'react-redux';

export default () => {
    const { requests } = useSelector(state => state.requestDetails)
    const { user, users } = useSelector(state => state.userDetails)

    let filteredRequests = requests.filter((req) => {
        return !req.isApproved && !req.isRejected && req.department === user.department;
    }).sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf());

    return (
        <div>
            <Header />
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Request By</th>
                            <th scope="col">Message</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredRequests.map((req, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{moment(req.createdAt).format('DD-MMM-YYYY')}</td>
                                    <td>{users.find(user => req.owner === user._id) ? users.find(user => req.owner === user._id).name : null}</td>
                                    <td>{req.message}</td>
                                    {
                                        req.user === user._id &&
                                        <td>
                                            <button className='btn btn-success mr-2' onClick={() => {
                                                let updatedRequest = req;
                                                updatedRequest.isApproved = true;
                                                updateRequest(updatedRequest);
                                            }}>Approve <i className="fa fa-check-circle" aria-hidden="true"></i> </button>
                                            <button className='btn btn-danger' onClick={() => {
                                                let updatedRequest = req;
                                                updatedRequest.isRejected = true;
                                                updateRequest(updatedRequest);
                                            }}>Reject <i className="fa fa-times-circle" aria-hidden="true"></i> </button>
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}