import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router'

import { useHotkeys } from 'react-hotkeys-hook'

import { GameBoard } from '../containers/GameBoard'

import { actions } from '../ducks/boards'

import { Column, Level, Button, Icon, Notification } from 'rbx'

import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { FaArrowAltCircleUp, FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

import { ROBOT, Status } from '../constants'

/**
 * Will contain the Retro Rockets gameboard
 */
export const GameContainer = ({goalIndex, goalColor, r, g, b, y}) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const moveHistory = useSelector(state => state.boards.history)
    const status = useSelector(state => state.boards.status)

    const metadata = useSelector(state => state.boards.metadata)

    useEffect(() => {
        history.replace(`/dashboard?goalIndex=${metadata.goalIndex}&goalColor=${metadata.goalColor}&r=${metadata.r}&g=${metadata.g}&b=${metadata.b}&y=${metadata.y}`)
    }, [metadata, history])

    const move = (direction) => {
        console.log(status)
        if(status !== Status.WIN) {
            if(direction === 'UP') {
                dispatch(actions.moveUp())
            } else if(direction === 'DOWN') {
                dispatch(actions.moveDown())
            } else if(direction === 'LEFT') {
                dispatch(actions.moveLeft())
            } else if(direction === 'RIGHT') {
                dispatch(actions.moveRight())
            }
        }
    }

    const selectRobot = (robot) => {
        console.log(status)
        if(status !== Status.WIN) {
            dispatch(actions.selectRobot(robot))
        }
    }

    const resetGameBoard = () => {
        dispatch(actions.setupBoard({}))
    }

    useHotkeys('1', () => selectRobot(ROBOT.RED))
    useHotkeys('2', () => selectRobot(ROBOT.GREEN))
    useHotkeys('3', () => selectRobot(ROBOT.BLUE))
    useHotkeys('4', () => selectRobot(ROBOT.YELLOW))

    useHotkeys('up', () => move('UP'))
    useHotkeys('down', () => move('DOWN'))
    useHotkeys('left', () => move('LEFT'))
    useHotkeys('right', () => move('RIGHT'))

    return (
        <Column.Group gapless>

            <Column>
                <GameBoard goalIndex={goalIndex} goalColor={goalColor} r={r} g={g} b={b} y={y} />
            </Column>
            <Column>
                {status === 'WIN' &&
                    <Notification color="success">
                        Congratulations! You solved the grid in {moveHistory.length} moves! <Button onClick={()=>{dispatch(actions.refreshBoard())}}>Refresh</Button>
                    </Notification>
                }
                <Column.Group multiline style={{ backgroundColor: 'black', padding: '0.25rem', paddingBottom: '0'}}>
                    <Column align="left">
                        { moveHistory.map((entry, idx) => (
                            <React.Fragment key={idx}>
                            { entry.direction === 'UP' && (
                                <FaArrowUp size="1.5em" style={{ color: entry.robot.toLowerCase() }} />
                            )}
                            { entry.direction === 'DOWN' && (
                                <FaArrowDown size="1.5em" style={{ color: entry.robot.toLowerCase() }} />
                            )}
                            { entry.direction === 'LEFT' && (
                                <FaArrowLeft size="1.5em" style={{ color: entry.robot.toLowerCase() }} />
                            )}
                            { entry.direction === 'RIGHT' && (
                                <FaArrowRight size="1.5em" style={{ color: entry.robot.toLowerCase() }} />
                            )}
                            </React.Fragment>
                        ))}
                    </Column>
                </Column.Group>

                <Level>
                    <Level.Item align="left">
                        <Button onClick={() => { dispatch(actions.moveUp()) }}><Icon size="medium"><FaArrowAltCircleUp /></Icon></Button>
                        <Button onClick={() => { dispatch(actions.moveDown()) }}><Icon size="medium"><FaArrowAltCircleDown /></Icon></Button>
                        <Button onClick={() => { dispatch(actions.moveLeft()) }}><Icon size="medium"><FaArrowAltCircleLeft /></Icon></Button>
                        <Button onClick={() => { dispatch(actions.moveRight()) }}><Icon size="medium"><FaArrowAltCircleRight /></Icon></Button>
                        <Button onClick={() => { resetGameBoard() }}>Reset Board</Button>
                    </Level.Item>
                </Level>
            </Column>
        </Column.Group>
    )
}



export default GameContainer