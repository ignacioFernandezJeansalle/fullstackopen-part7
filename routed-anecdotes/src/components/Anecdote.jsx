import "./Anecdote.css";

const Anecdote = ({ anecdote }) => {
  if (!anecdote) return null;

  const { content, author, info, votes } = anecdote;

  return (
    <article className="anecdote">
      <h2>
        {content} by {author}
      </h2>
      <p>Has {votes} votes</p>
      <p>
        For more info see{" "}
        <a href={info} target="_blank" rel="noreferrer">
          {info}
        </a>
      </p>
    </article>
  );
};

export default Anecdote;
