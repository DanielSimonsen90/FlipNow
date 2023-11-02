import { useGame } from "providers/GameProvider";

export default function CardContainer() {
  const { game, isClientTurn } = useGame(false);

  return (
    <ul className="gamecard-container" data-is-turn={isClientTurn}>
      {game.cards.map((card, i) => (
        <li key={i} className="gamecard">
          <span>{card.name}</span>
        </li>
      ))}
    </ul>
  );
}