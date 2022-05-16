import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container d-flex align-items-center">
                    <span>&copy; Copyright S_Dev Company {new Date().getFullYear()}</span>
                </div>
            </div>
        );
    }
}

export default Footer;