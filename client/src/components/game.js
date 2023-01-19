import React from "react";

const styles = {
    td: {
        // width: '300px',
        // height: '300px',
        // border: '20px',
        // borderColor: 'white'
        border: '1px solid #999',
        width: '100px',
        height: '100px'
    },
    tdBig: {
        border: '1px solid #999',
        width: '200px',
        height: '200px'
    },
    chat: {
        height: '60%',
        width: '30%',
    }
}
function Game () {
    return (
        <div>
            <div className="d-flex Justify-content-around">
                <div className="col">
                    <h2>Player 1</h2>
                    <h4>Wins: 2 Losses: 0 Ties: 2</h4>
                </div>
                <div className="col">
                    <h2>Player 2</h2>
                    <h4>Wins: 3 Losses: 1 Ties: 0</h4>
                </div>
            </div>
            <div className="justify-content-center">
                <table>
                    <tr>
                        <td style={styles.tdBig} value={'X'}></td>
                        <td style={styles.td}>1</td>
                        <td style={styles.tdBig}>2</td>
                    </tr>
                    <tr>
                        <td style={styles.td}>3</td>
                        <td style={styles.tdBig}>4</td>
                        <td style={styles.td}>5</td>
                    </tr>
                    <tr>
                        <td style={styles.tdBig}>6</td>
                        <td style={styles.td}>7</td>
                        <td style={styles.tdBig}>8</td>
                    </tr>
                </table>
            </div>
            <div className="container border border-2 border-light rounded" style={styles.chat}>
                <p>This is where chat will be</p>
            </div>
        </div>
    )
};

export default Game;