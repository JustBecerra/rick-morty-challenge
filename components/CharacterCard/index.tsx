import { CharactersType } from "@/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import HelpIcon from "@mui/icons-material/Help";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

type CardProps = {
  char: CharactersType;
  setCharacter: Dispatch<SetStateAction<CharactersType | null>>;
  chosenCharacter: CharactersType | null;
};

export const CharacterCard = (props: CardProps) => {
  const { name, image, species, status, id } = props.char;
  const { setCharacter, chosenCharacter } = props;

  const characterSelection = () => {
    if (chosenCharacter && chosenCharacter.id === id) {
      setCharacter(null);
    } else {
      setCharacter(props.char);
    }
  };

  const renderIcon = () => {
    if (status === "Alive") {
      return (
			<FavoriteIcon
				sx={{
					color: chosenCharacter && chosenCharacter.id === id
						? "black"
						: "white"
				}}
				fontSize="small"
        data-testid="alive-icon"
			/>
		)
    } else if (status === "Dead") {
      return <HeartBrokenIcon sx={{
        color: chosenCharacter && chosenCharacter.id === id
          ? "black"
          : "white"
      }} fontSize="small" data-testid="dead-icon"/>;
    } else {
      return (
			<HelpIcon
				sx={{
					color:
						chosenCharacter && chosenCharacter.id === id
							? "black"
							: "white",
				}}
				fontSize="small"
				data-testid="missing-icon"
			/>
		)
    }
  };
  return (
    <div
      className={`flex w-[90%] h-[100px] xl:w-[45%] rounded-lg md:h-[150px] border-2 border-gray-50 m-2 cursor-pointer ${
        chosenCharacter && chosenCharacter.id === id && "bg-gray-50"
      }`}
      onClick={characterSelection}
    >
      <div className="w-[30%] md:w-[50%] h-[100%] relative overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-[70%] md:w-[50%]">
        <h1
          className={`text-sm md:text-xs text-wrap text-balance text-center ${
            chosenCharacter && chosenCharacter.id === id && "text-black"
          }`}
        >
          {name}
        </h1>
        <div className="flex gap-2 w-[100%] flex-col  justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center items-center">
              {renderIcon()}
            </div>
            <h3
              className={`text-xs text-center mr-2 ${
                chosenCharacter && chosenCharacter.id === id && "text-black"
              }`}
            >
              {status}
            </h3>
          </div>
          <h3
            className={`text-xs text-center text-wrap ${
              chosenCharacter && chosenCharacter.id === id && "text-black"
            }`}
          >
            {species}
          </h3>
        </div>
      </div>
    </div>
  );
};
