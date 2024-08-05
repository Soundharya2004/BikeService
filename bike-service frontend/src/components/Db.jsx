import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Db.css';

const Dashboard = () => {
    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Dashboard</h1>
                <div className="row pr-4 justify-content-center">
                    <div className="col-xl-3 col-lg-4 col-md-6 mb-3">
                        <div className="card text-white bg-dark-blue o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">
                                    Available Services
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/ProductDetails">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 mb-3">
                        <div className="card text-white bg-dark-blue o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">
                                    Total Bookings
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/ServiceBookings">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
