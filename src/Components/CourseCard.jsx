/*import { Card } from "./ui/card";
import { CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

const CourseCard = ({ title, image, description, }) => {
    return (
        
        <Button>
            <Card className="w-full max-w-sm rounded-xl shadow-sm bg-gray-100">
                <CardContent>
                    <img src={image} alt={title} className="w-full h-40 object-cover" />
                    <p className="text-sm text-gray-500">{description}</p>
                </CardContent>
                <CardFooter>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                        <div className="bg-green-500 h-full w-[10%]"></div>
                    </div>
                    <p className="text-sm text-gray-500 text-right">10%</p>
                </CardFooter>
            </Card>
        </Button>
        
  );
}

export default CourseCard;*/

const CourseCard = ({ title, image, description, onClick, view }) => {
  const clickable = view === "other";
  
    return (
      <div className={`border rounded-lg overflow-hidden shadow-md cursor-${clickable ? "pointer" : "default"} transition duration-200 hover:shadow-lg`}
      onClick={clickable ? onClick : null}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          {/*<p className="text-sm text-gray-500">{date}</p>{/*
          <p className="text-sm text-gray-500">{facilitator}</p>
          <p className="text-sm text-gray-500">{location}</p>*/}
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    );
  };
  
  export default CourseCard;