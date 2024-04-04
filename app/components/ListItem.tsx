import Image from "next/image";
import { ListItemProps } from "../page";

export const ListItem = (props: ListItemProps) => {
  const {
    id,
    name,
    price,
    "call-availability": callAvailability,
    "chat-availability": chatAvailability,
    pictureUrl,
  } = props;

  return (
    <section
      className="list-section"
      key={id}
    >
      <section className="flex gap-4">
        <section className="">
          <Image
            className="rounded-full"
            src={pictureUrl}
            alt="pictureUrl"
            width={100}
            height={100}
          />
        </section>

        <h4>{name}</h4>
      </section>
      <section className="flex flex-col gap-2 ">
        <p className="">{price}</p>
        <button
          disabled={callAvailability !== "online"}
          className={`button ${
            callAvailability === "online" ? "bg-cyan-500" : "bg-gray-500"
          }`}
        >
          {"Call Now"}
        </button>
        <button
          disabled={chatAvailability !== "online"}
          className={`button ${
            chatAvailability === "online" ? "bg-cyan-500" : "bg-gray-500"
          }`}
        >
          {"Chat Now"}
        </button>
      </section>
    </section>
  );
};
