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
  