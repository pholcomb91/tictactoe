// , { Profiler }
import React from "react";

function HomePage () {
    return (
        <div>
            <h2>Congratulations Peter!</h2>
            <div>You've lost 27 games</div>
            <div>and you've only won 3</div>
            <div>while tying 6 times</div>
            <div>Let your opponent know what Room ID to use.</div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="RoomID" aria-label="RoomID" aria-describedby="button-addon2"></input>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Enter</button>
            </div>
        </div>
    )
}

export default HomePage;