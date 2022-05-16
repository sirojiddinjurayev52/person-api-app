import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar navbar-expand-md navbar-dark btn-success">
                <div className="container">
                    <a href="#" className="navbar-brand font-weight-bold font-italic">Person Information</a>

                    <ul className="navbar-nav">
                        <li className="nav-item"><a href="" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="" className="nav-link">News</a></li>
                        <li className="nav-item"><a href="" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="" className="nav-link">Contact</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Navbar;