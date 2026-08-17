import { AspectRatio } from "radix-ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export type CarouselImg = {
  id?: number;
  url: string;
};

export default function ImgCarousel({ imgs }: { imgs: CarouselImg[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {imgs.map((img, i) => (
          <CarouselItem key={`carousel-item-${i}`}>
            <img
              src={img.url}
              alt={`Screenshot-${i}`}
              width="500"
              height="1080"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
