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
      {card.flipped ? card.name : 'Card'}
    </div>
  );
}