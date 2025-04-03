import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export default function TodayPage() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const inspirationCards = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/1082655/pexels-photo-1082655.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Classic Automobiles",
      title: "Vintage Cars on Open Roads",
      backgroundColor: "bg-blue-100",
      creator: "ClassicCars",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/8134812/pexels-photo-8134812.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Chaos To Order",
      title: "Satisfying Organisation Ideas For Your Home",
      backgroundColor: "bg-gray-100",
      creator: "OrganizeLife",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/3368288/pexels-photo-3368288.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Get Creative",
      title: "Floral Food Decor To Impress Guests",
      backgroundColor: "bg-amber-50",
      creator: "FoodArtistry",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/3050938/pexels-photo-3050938.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Time To Glow",
      title: "Dewy Spring Makeup Inspiration",
      backgroundColor: "bg-pink-300",
      creator: "BeautyTrends",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/29805039/pexels-photo-29805039/free-photo-of-elegant-woman-in-traditional-indian-sari-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Look Your Best",
      title: "Floral Hairdos At Weddings",
      backgroundColor: "bg-amber-100",
      creator: "WeddingStyles",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/9961399/pexels-photo-9961399.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "The Style Guide",
      title: "Helpful Styling Tips For Spring",
      backgroundColor: "bg-pink-100",
      creator: "SeasonalFashion",
    },
    {
      id: 7,
      image:
        "https://images.pexels.com/photos/6620838/pexels-photo-6620838.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Tips And Tricks",
      title: "Everyday Scalp Care Routine",
      backgroundColor: "bg-stone-200",
      creator: "HairHealth",
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600">{formattedDate}</p>
        <h1 className="text-3xl font-bold mt-1">Stay Inspired</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inspirationCards.map((card) => (
          <div key={card.id} className="mb-4">
            <div className="relative overflow-hidden rounded-2xl cursor-pointer">
              <div className={`aspect-[4/3] ${card.backgroundColor}`}>
                <img
                  src={card.image || "/placeholder.svg"}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <p className="text-sm font-medium opacity-90">
                    {card.category}
                  </p>
                  <h3 className="text-xl font-bold mt-1">{card.title}</h3>
                </div>
              </div>
            </div>

            {/* Creator info below the card */}
            <div className="flex items-center justify-between mt-2 px-1">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" alt={card.creator} />
                  <AvatarFallback>{card.creator[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {card.creator}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-7 w-7 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mb-2">
          <Check className="w-5 h-5" />
        </div>
        <p className="text-sm text-gray-600">That's all for today!</p>
        <p className="text-base font-medium mt-1">
          Come back tomorrow for more inspiration
        </p>

        <Button
          variant="outline"
          className="mt-6 rounded-full border-gray-300 text-black"
        >
          Go to home feed
        </Button>
      </div>
    </div>
  );
}
