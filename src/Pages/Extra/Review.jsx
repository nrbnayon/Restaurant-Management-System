import { FaStar } from "react-icons/fa";

const CustomerReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      review:
        "Absolutely amazing dining experience! The food was delicious and the service was impeccable. Will definitely be returning.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      review:
        "Great atmosphere and friendly staff. The dishes were flavorful and beautifully presented.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      review:
        "I've been to many restaurants, but this one stands out. The farm-to-table concept really shines through in the quality of the ingredients.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-primary" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
          Our Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center mb-2">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span className="text-lg font-semibold">{review.name}</span>
                </div>
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewSection;
