"use client";

import { useEffect, useState, Suspense } from "react";

import DATA from "./data.json";

import { ListItem } from "./components/ListItem";

type ListProps = {
  id: number;
  name: string;
  price: string;
  "call-availability": string;
  "chat-availability": string;
  pictureUrl: string;
};

export type ListItemProps = {
  key: string;
} & ListProps;

export default function Home() {
  const [lists, setLists] = useState<ListProps[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://demo2255213.mockable.io/listings");
      if (!res.ok) {
        throw new Error("failed to fetch data");
      }
      const result = await res.json();

      // was getting 403 so mock response

      // return Promise.resolve(DATA).then((result: any) => {
      //   setLists(result.data);
      // });
      
      setLists(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchUpdateStatusOfLists() {
    try {
      const promises = lists.map(async (list) => {
        const res = await fetch(
          `https://demo2255213.mockable.io/advisor-availability?advisorId=${list.id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch updates status");
        }

        const result = await res.json();
        return {
          ...list,
          "call-availability": result["call-availability"],
          "chat-availability": result["chat-availability"],
        };
      });

      const updatedLists = await Promise.all(promises);
      setLists(updatedLists);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUpdateStatusOfLists();
    }, 30000); // change the delay
    return () => clearInterval(interval);
  }, [lists]);

  if (lists.length === 0) {
    return <div>No Data</div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="container mx-auto w-1/2 flex flex-col">
        {lists?.map((list, index) => {
          return <ListItem key={`${list.id}-${index}`} {...list} />;
        })}
      </div>
    </Suspense>
  );
}
