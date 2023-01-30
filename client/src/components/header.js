import React from "react";

const styles = {
    h1: {
        fontSize: '2000%',
        textShadow: '2px 2px 4px #858585',
    }
}

function Header () {
    return (
        <div className="d-flex text-center row m-5">
            <p className="col-12 text-center" style={styles.h1}>Smack Talk Toe</p>
        </div>
    )
}

export default Header;
