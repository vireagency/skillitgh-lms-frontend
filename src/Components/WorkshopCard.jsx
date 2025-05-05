
const WorkshopCard = ({ date, title, image }) => {
    return (
      <div className="rounded-xl overflow-hidden shadow-md bg-white">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{date} · Upcoming</p>
          <h3 className="font-semibold text-lg">{title}</h3>
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