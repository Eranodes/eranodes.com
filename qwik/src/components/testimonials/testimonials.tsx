import { component$, $ } from "@builder.io/qwik"; // Import $ from Qwik
import { BsStarFill } from "@qwikest/icons/bootstrap";
import testimonialStyles from "./testimonials.module.css";
import testimonialsData from '../../data/testimonials.json';

// Define an interface for the Testimonial object
interface Testimonial {
  author: string;
  location: string;
  rating: number;
  date: string;
  content: string;
}

// Use the Testimonial interface as the type for the Testimonial parameter
const TestimonialItem = ({ testimonial }: { testimonial: Testimonial }) => {

  // Function to render star rating based on the numeric rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} class={testimonialStyles.star}>★</span>);
      } else {
        stars.push(<span key={i} class={testimonialStyles.starEmpty}>☆</span>);
      }
    }
    return stars;
  };

  return (
    <li class={testimonialStyles.card}>
      <div>
        <p class={testimonialStyles.author}>{testimonial.author}</p>
        <p class={testimonialStyles.location}>{testimonial.location}</p>
        <p class={testimonialStyles.date}>{testimonial.date}</p>
        <div class={testimonialStyles.rating}>
          {renderStars(testimonial.rating)}
        </div>
        <p class={testimonialStyles.content}>{testimonial.content}</p>
      </div>
    </li>
  );
};

export default component$(() => {
  // Filter testimonials from testimonialsData
  const Testimonials: Testimonial[] = testimonialsData.reviews;

  // Function to open Trustpilot review in a new tab
  const openTrustpilot = $(() => {
    window.open('https://www.trustpilot.com/review/eranodes.com', '_blank');
  });

  return (
    <div>
      <p class={testimonialStyles.heading}>Testimonials</p>
      <div class={[testimonialStyles.wrapper].join(" ")}>
        <div class={testimonialStyles.testimonials}>
          {Testimonials.map((testimonial: Testimonial, index) => (
            <TestimonialItem key={index} testimonial={testimonial} />
          ))}
        </div>
        <button onClick$={openTrustpilot} class={testimonialStyles.trustpilotButton}>
          <BsStarFill/> Trustpilot
        </button>
      </div>
    </div>
  );
});
