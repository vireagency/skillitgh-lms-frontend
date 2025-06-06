import React from "react";
//import { Card } from "./ui/card";
//import { CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

const WorkshopCard = ({
  title,
  date,
  status,
  image,
  facilitator,
  price,
  location,
  description,
  duration,
  onClick,
  view,
  isRegistered,
}) => {
  const clickable = view === "upcoming";

  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-md cursor-${
        clickable ? "pointer" : "default"
      } transition duration-200 hover:shadow-lg`}
      onClick={clickable ? onClick : null}
    >
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {date} <strong>&bull; {status}</strong>{" "}
          <span className="font-bold ml-24 text-md text-green-400">{price}</span>
          {/* Show Register/Unregister button only for upcoming workshops */}
          {view === "upcoming" && (
            <span className="flex my-4">
              {isRegistered ? (
                <button className="text-white px-4 py-2 bg-red-600 rounded-full font-semibold">
                  Unregister
                </button>
              ) : (
                <button
                  className="text-white px-4 py-2 bg-green-500 rounded-full font-semibold"
                  // onClick={...} // You can handle register logic here if needed
                >
                  Register
                </button>
              )}
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500">{duration}</p>
        <p className="text-sm text-gray-500">{facilitator}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default WorkshopCard;


  
 /* import { Card } from "./ui/card";
import { CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

const WorkshopCard = () => {
    return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white">
      <Card className="w-[300px] shadow-md">
        <CardHeader>
          <CardTitle>Course Summary</CardTitle>
        </CardHeader>
        <CardContent>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        </CardContent>
        <CardFooter>
          <button className="text-blue-600 font-medium">Enroll Now</button>
        </CardFooter>
      </Card>

    </div>
  );
};

export default WorkshopCard;*/