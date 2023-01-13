import React from "react";

const styles = {
    h1: {
        fontSize: '775%',
    }
}

function Header () {
    return (
        <div className="d-flex text-center row m-5">
            <h1 className="col-12" style={styles.h1}>Tic Tac Toe</h1>
            <div className="d-flex justify-content-around">
                <div className="col">
                    <h2>Player 1</h2>
                    <h4>Wins: 2 Losses: 0</h4>
                </div>
                <div className="col">
                    <h2>Player 2</h2>
                    <h4>Wins: 3 Losses: 1</h4>
                </div>
            </div>
        </div>
    )
}

export default Header;
