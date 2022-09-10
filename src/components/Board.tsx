import { useState } from "react"
import NavBar from "./NavBar"
import TaskCreator from "./TaskCreator"
import TaskList from "./TaskList"


export default function Board() {


    return (
        <div>
            <NavBar/>
            <TaskCreator/>
            <TaskList/>
        </div>
    )
}
