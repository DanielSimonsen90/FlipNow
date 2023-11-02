import { GameCard } from "models/backend";
import { useGame } from "providers/GameProvider";

type Props = {
  card: GameCard;
  index: number;
}

export default function Card({ card, index }: Props) {
  const { isClientTurn, dispatch } = useGame();

  function onClick() {
    if (isClientTurn || !card.flipped) dispatch('flipCard', index);
  }

  return (
    <div className="gamecard" onClick={onClick}>
      {card.flipped ? (
        <img src={`/assets/cards/${card.name}.png`} alt={card.name} />
      ) : (
        <div className="card-back">FlipNow</div>
      )}
    </div>
  );
}