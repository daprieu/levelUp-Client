import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, editGame, getGame, games } = useContext(GameContext)
    console.log('games: ', games);
    // console.log('getGame: ', getGame);
    const gameId = useParams()
    const pGameId = parseInt(gameId.gameId)
    console.log('pGameId: ', pGameId);

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameType: 0
    })
    console.log('currentGame: ', currentGame);
    useEffect(() => {
        if (gameId) {
            getGame(pGameId)
            .then(game => {
                setCurrentGame({
                    skillLevel: game?.skill_level,
                    numberOfPlayers: game?.number_of_players,
                    title: game.title,
                    maker: game.maker,
                    gameType: game.game_type?.id
                })
            })
            }
        
    }, [gameId])
    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
        // if (gameId) {
        //     getGames(parseInt(gameId.gameId))
        //     .then(game => {
        //         setCurrentGame(game)
        //     })
        // }
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeStateHandler = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeStateHandler}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame?.maker}
                        onChange={changeStateHandler}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame?.skillLevel}
                        onChange={changeStateHandler}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame?.numberOfPlayers}
                        onChange={changeStateHandler}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select type="text" name="gameType" required autoFocus className="form-control"
                        value={currentGame?.gameType}
                        onChange={changeStateHandler}>
                    <option value="0">Select a game type</option>
                    {gameTypes.map(gt => (
                        <option key={gt.id} value={gt.id}>
                            {gt.name}
                        </option>
                    ))}
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}
            {
                (pGameId) ?
                <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    editGame({
                        id: currentGame.pGameId,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameType: parseInt(currentGame.gameType)
                    })
                    // Send POST request to your API
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Confirm Edit</button> 
                :
                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()
    
                        const game = {
                            maker: currentGame.maker,
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            skillLevel: parseInt(currentGame.skillLevel),
                            gameType: parseInt(currentGame.gameType)
                        }
                        // Send POST request to your API
                        createGame(game)
                            .then(() => history.push("/games"))
                    }}
                    className="btn btn-primary">Create</button>

            }
        </form>
    )
}