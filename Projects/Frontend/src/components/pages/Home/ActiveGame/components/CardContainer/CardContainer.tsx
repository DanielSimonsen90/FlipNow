import { useGame } from "providers/GameProvider";
import Card from "../Card";

export default function CardContainer() {
  const { game, isClientTurn } = useGame(false);

  return (
    <main>
      <ul className="gamecard-container" data-is-turn={isClientTurn}>
        {game.cards.map((card, i) => (
          <li key={i}>
            <Card card={card} index={i} />
          </li>
        ))}
      </ul>
    </main>
  );
}