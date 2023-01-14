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
    }
}
function Game () {
    return (
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
    )
};

export default Game;