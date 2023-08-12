import React, { useState, useEffect } from "react";
import GamesService from "../services/games-services";
import '../css/games-app.css'

const gamesService = new GamesService("http://localhost:3000");

export default function GamesList() {
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        gamesService.getGames()
            .then(gamesJsonData => {
                setGames(gamesJsonData);
            })
            .catch(error => {
                setErrorMessage("Sorry site down");
            });
    },
        []);

    function getPlatformIcon(platform) {
        if (platform.includes("Windows"))
            return "W"

    }


    let gamesListJsx = games.map(game => {
        return (
            <div class="game-card card grow mb-3 shadow h-md-250 video-card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-3 align-self-center mt-n2">
                            <div class="card">
                                <div class="image-wrapper">
                                    <img class="card-img-top" src={game.thumbnail} alt={game.short_description} />
                                </div>
                            </div>
                        </div>
                        <div class="col-7 col-sm-6 col-lg-7 align-self-center justify-content-center position-static">
                            <a href="/tales-of-yore" class="stretched-link no-underline">
                                <h4 class="card-title text-truncate mt-n2 mb-1">{game.title}</h4>
                            </a>
                            <div class="text-truncate text-muted mb-1">{game.short_description}</div>
                            <span class="badge badge-secondary text-dark mr-2">{game.genre}</span>
                        </div>
                        <div class="col-1 align-self-center text-center text-muted justify-content-center d-none d-sm-block">
                            <h5><i class="fab fa-windows">{getPlatformIcon(game.platform)}</i></h5>
                        </div>
                        <div class="col-1 justify-content-center text-center align-self-center">
                            <span class="badge badge-ftg py-2 px-2 mb-2">FREE</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    })


    return (
        <>
            {errorMessage && <h1>{errorMessage}</h1>}
            {!errorMessage && <h1>list of Games</h1>}
            <div class="games-list-container">
                {gamesListJsx}
            </div>
        </>
    );
}