import { Link } from "react-router-dom";

const AnecdoteListItem = ({ anecdote }) => {
  return (
    <li>
      <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
    </li>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
