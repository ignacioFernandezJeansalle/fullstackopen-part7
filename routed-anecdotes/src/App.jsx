import { useState } from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import Header from "./components/Header";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch("/anecdotes/:id");
  const anecdote = match ? anecdotes.find((a) => a.id === Number(match.params.id)) : null;

  /* const [notification, setNotification] = useState(""); */

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  /* const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  }; */

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
