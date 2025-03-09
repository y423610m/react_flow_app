"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Flow from "./GraphNodes/Flow"
import TopBar from "./TopBar";

export default function App() {
    return (
      <div>

        <TopBar/>
        <Flow/>
        </div>
    );
}