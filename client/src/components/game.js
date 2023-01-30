import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./game.css";
import { useAccountContext } from '../utils/globalstate';
import { useQuery } from '@apollo/client';

const styles = {
    td: {
        border: '1px solid #999',
        width: '100px',
        height: '100px'
    },
    tdBig: {
        border: '33px solid',
        borderColor: 'transparent, #858585, none, #858585',
        width: '100px',
        height: '100px'
    },
    chat: {
        height: '60%',
        width: '30%',
    },
    XO: {
        fontSize: '400%',
        margin: '0px'

    }
}
function Game () {
    // const [state, dispatch] = useAccountContext('');
    const [turn, setTurn] = useState('Peter');
    const [onDeck, setOnDeck] = useState('Jenn');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState('');
    const [loser, setLoser] = useState('');
    const [tie, setTie] = useState('');
    const [count, setCount] = useState(1);
    const [name, setName] = useState('');
    const [turnWins, setTurnWins] = useState(1);
    const [turnTies, setTurnTies] = useState(3);
    const [turnLosses, setTurnLosses] = useState(7);
    const [oWins, setOWins] = useState(7);
    const [oTies, setOTies] = useState(3);
    const [oLosses, setOLosses] = useState(1);

    const gameOutcome = (table) => {
        let winners = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]

            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }
        for (let winner in winners) {
          winners[winner].forEach((pattern) =>{
            if (
                table[pattern[0]] === '' ||
                table[pattern[1]] === '' ||
                table[pattern[2]] === ''
            ) {} else if (
                table[pattern[0]] === table[pattern[1]] &&
                table[pattern[1]] === table[pattern[2]]
            ) {
                setWinner(turn);
                if (turn === "Peter") {
                    setTurnWins((turnWins + 1));
                    setOLosses((oLosses + 1))
                } else {
                    setOWins((oWins + 1));
                    setTurnLosses((turnLosses + 1))
                }
                setLoser(onDeck);
                return;
            } else if (count === 9) {
                setTie('True');
                setTurnTies((turnTies + 1));
                setOTies((oTies + 1));
            }
          })  
        }
    }

    const handleClick = (num) => {
        if (cells[num] !== '') {
            alert('Already taken you fool!!');
            return;
        }
        let table = [...cells];
        if (turn === 'Peter') {
            table[num] = 'X';
            setTurn('Jenn');
            setOnDeck('Peter');
            setCount((count + 1));
        } else {
            table[num] = 'O';
            setTurn('Peter');
            setOnDeck('Jenn')
            setCount((count + 1));
        }
        gameOutcome(table)
        setCells(table);
    };
    const handleRestart = () => {
        setWinner('');
        setCells(Array(9).fill(''));
        setCount(1);
        const elP = document.getElementById("resultP");
        const elBtn = document.getElementById("resultBtn");
        const elTie = document.getElementById("resultTie");
        const elTieBtn = document.getElementById("resultTieBtn");
        if (elP != null) { 
            elP.remove();
            elBtn.remove();
        } else {
        elTie.remove();
        elTieBtn.remove();
        }
    }

    const Cell = ({ num }) => {
        if (winner === ('') && count <= 9) {
        return <td onClick={() => handleClick(num)} className="text-center" style={styles.XO}>{cells[num]}</td>
        } else {
        return <td className="text-center" style={styles.XO}>{cells[num]}</td>    
        }
    }
    return (
        <div className="col">
            <div className="row">
            <div className="col-12">
                    <h3 className="text-center">Game12</h3>
                    {winner && (
                        <div className="row d-flex justify-content-center">
                            <h1 className="row d-flex justify-content-center m-2" id="resultP">{loser} LOSES!!!!</h1>
                            <button className="col-2 m-2" onClick={handleRestart} id="resultBtn">Play Again</button>
                            <Link className="btn" to="/homepage">Run Back Home</Link>
                        </div>
                    )}
                    {tie && (
                        <div className="row d-flex justify-content-center">
                            <h1 className="row d-flex justify-content-center m-2" id="resultTie">CONGRATULATIONS, YOU BOTH MANAGED TO LOSE!!!!</h1>
                            <button className="col-2 m-2" onClick={handleRestart} id="resultTieBtn">Play Again</button>
                            <Link className="btn" to="/homepage">Run Back Home</Link>
                        </div>
                    )}
                </div>
                <div className="d-flex align-content-center col-4">
                    <div className="col">
                        <div className="row text-center m-3">
                            {(turn === 'Peter') ? <h1>Peter</h1> : <h5>Peter</h5>}
                            <h4>Losses: {turnLosses} Wins: {turnWins} Draw: {turnTies}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <table className="d-flex justify-content-center m-2">
                        <tbody>
                            <tr>
                                <Cell num={0}/>
                                <Cell num={1}/>
                                <Cell num={2}/>
                            </tr>
                            <tr>
                                <Cell num={3}/>
                                <Cell num={4}/>
                                <Cell num={5}/>
                            </tr>
                            <tr>
                                <Cell num={6}/>
                                <Cell num={7}/>
                                <Cell num={8}/>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container col-4" style={styles.chat}>
                    <div className="row text-center m-3">
                        {(turn === 'Jenn') ? <h1>Jenn</h1> : <h5>Jenn</h5>}
                        <h4>Losses: {oLosses} Wins: {oWins} Draw: {oTies}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Game;