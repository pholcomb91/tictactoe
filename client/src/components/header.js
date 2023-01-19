import React from "react";

const styles = {
    h1: {
        fontSize: '775%',
    }
}

function Header () {
    return (
        <div className="d-flex text-center row m-5">
            <h1 className="col-12" style={styles.h1}>Smack Talk, Toe</h1>
        </div>
    )
}

export default Header;
