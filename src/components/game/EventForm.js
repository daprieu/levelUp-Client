import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"
import DatePicker from 'react-date-picker'


export const EventForm = () => {
    const history = useHistory()
    const {games, getGames} = useContext(GameContext)
    const {createEvent} = useContext(EventContext)
    const [currentEvent, setEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: ""
    })

    

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                            {game.title}
                        </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input name="description" className="form-control"
                        value={ currentEvent.description }
                        onChange={ changeEventState }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input name="date" className="form-control" type="date" 
                        value={currentEvent.date }
                        onChange={ changeEventState }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input name="time" className="form-control" type="time"
                        value={currentEvent.time}
                        onChange={ changeEventState }/>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {
                        gameId: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }
                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}