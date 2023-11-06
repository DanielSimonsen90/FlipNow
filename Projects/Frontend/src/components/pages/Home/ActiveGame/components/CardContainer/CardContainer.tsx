import { useGame } from "providers/GameProvider";
import Card from "../Card";
import { useAsyncEffectOnce } from "danholibraryrjs";
import { useState } from "react";

type CardFile = [string, any];

export default function CardContainer() {
  const { game, isClientTurn } = useGame(false);
  const [cardFiles, setCardFiles] = useState<Array<CardFile>>([]);

  useAsyncEffectOnce(async () => {
    const cards = await Promise.all(
      game.cards.map(async ({ name }) => [name, await import(`../../../../../../../public/assets/cards/${name}.png`)] as CardFile)
    );
    setCardFiles(cards);
  });

  return (
    <main>
      <ul className="gamecard-container" data-is-turn={isClientTurn}>
        {game.cards.map((card, i) => {  
          const cardFile = cardFiles.find(([name]) => name === card.name);

          return (
            <li key={i}>
              <Card card={card} index={i} file={cardFile} />
            </li>
          )
        })}
      </ul>
    </main>
  );
}