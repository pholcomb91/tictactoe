import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UPDATE_USER_NAME, GET_USER } from '../utils/mutations';
import { useAccountContext } from '../utils/globalstate';
import Game from '../components/game';

const styles = {
    input: {
        height: 'auto',
        width: '100px',
    },
    btn: {
        height: 'auto',
        width: 'auto',
    }
}

function HomePage () {
    // const { data } = useQuery(GET_USER);
    // const [state, dispatch] = useAccountContext('');
    const [name, setName] = useState('Peter');
    const [wins, setWins] = useState(2);
    const [draws, setDraws] = useState(4);
    const [losses, setLosses] = useState(8);
    const [room, setRoom] = useState('');
    const enterRoom = () => {
        // if (state.isLoggedIn) {
            const roomInput = document.getElementById('room');
            const roomId = roomInput.value;
            setRoom(roomId);
            console.log(room);
        // } 
        
    }
    // const changeName = () => {
    //     let newName = prompt("What would you like your new User Name to be?");
    //     dispatch({
    //         type: UPDATE_USER_NAME,
    //         userName: newName,
    //       });
    //     setName(newName);
    //     console.log(newName)
    // }
    return (
        <>
            <div className="d-flex justify-content-center row">
                <h2 className="col-12 text-center">Congratulations {name}!</h2>
                {/* <button type="button" className="btn btn-primary" style={styles.btn} onClick={changeName}>Change Name?</button> */}
                <div className="col-12 text-center">You've lost {losses} games!</div>
                <div className="col-12 text-center">You've only won {wins}!</div>
                <div className="col-12 text-center">And you've Drawn {draws} times...</div>
                <div className="container d-flex justify-content-center m-5 row">
                    <div className="col-12 text-center">Let your opponent know what Room ID to use.</div>
                    <input type="text" className="form-control row m-0" placeholder="RoomID" aria-label="RoomID" aria-describedby="button-addon2" style={styles.input} id="room"></input>
                    <Link className="btn btn-outline-secondary row m-0" type="button" id="button-addon2" style={styles.btn} to='/game'>Enter</Link>
                </div>
            </div>  
        </>
    )
}

export default HomePage;