import Clubs from "@/app/assets/clubs";
import Diamonds from "@/app/assets/diamonds";
import Hearts from "@/app/assets/hearts";
import Spades from "@/app/assets/spades";

export default function suitToIcon(suit: string) {
  switch (suit) {
    case "H":
      return <Hearts />;
    case "D":
      return <Diamonds />;
    case "C":
      return <Clubs />;
    case "S":
      return <Spades />;
  }
}
