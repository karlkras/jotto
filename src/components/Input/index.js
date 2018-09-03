import React from 'react';
import { connect } from 'react-redux';

class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <button />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(Input);