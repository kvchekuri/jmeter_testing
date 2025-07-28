import React from 'react';
import { CarouselsHome } from "./carousels";
import { CategoryBar } from "./categoryBar";
import { EventList } from "./eventList";

export default function HomeBody() {
  return (
    <div className="home-body-container">
      <CarouselsHome />
      <CategoryBar />
      <EventList />
    </div>
  );
}