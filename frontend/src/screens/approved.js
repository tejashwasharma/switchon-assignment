import React from 'react';
import Header from '../components/header';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default () => {
    const { requests } = useSelector(state => state.requestDetails)
    const { user } = useSelector(state => state.userDetails)

    let filteredRequests = requests.filter((req) => {
        return req.isApproved && req.user === user._id;
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
                            <th scope="col">Message</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredRequests.map((req, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{moment(req.createdAt).format('DD-MMM-YYYY')}</td>
                                    <td>{req.message}</td>
                                    <td style={{ color: 'green' }}>Approved</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}