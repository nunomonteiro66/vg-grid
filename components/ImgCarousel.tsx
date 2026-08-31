import { AspectRatio } from "radix-ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { ComponentProps, useEffect, useState } from "react";
import { CustomDialog } from "./CustomDialog";

export type CarouselImg = {
  id?: number;
  url: string;
};

type ImgCarouselProps = ComponentProps<typeof Carousel> & {
  imgs?: CarouselImg[];
  expandable?: boolean;
  selectedIndex?: number;
  onImageChange?: (index: number) => void;
};

type ExpandableImageProps = {
  src: string;
  alt: string;
  expandable?: boolean;
};

function Image({ src, alt, expandable = false }: ExpandableImageProps) {
  const image = (
    <div className="relative w-full aspect-video overflow-hidden rounded-md">
      <img src={src} alt={alt} width="500" height="1080" />
    </div>
  );

  if (!expandable) return image;

  return (
    <CustomDialog.Root>
      <CustomDialog.Trigger>{image}</CustomDialog.Trigger>
      <CustomDialog.Content>
        <div></div>
      </CustomDialog.Content>
    </CustomDialog.Root>
  );
}

export default function ImgCarousel({
  imgs,
  expandable = false,
  selectedIndex = 0,
  onImageChange,
  ...props
}: ImgCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const index = api.selectedScrollSnap();

      onImageChange?.(index);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, onImageChange]);

  useEffect(() => {
    if (!api) return;

    if (api.selectedScrollSnap() !== selectedIndex) {
      api.scrollTo(selectedIndex, true);
    }
  }, [api, selectedIndex]);

  return (
    <Carousel setApi={setApi} {...props}>
      <CarouselContent>
        {imgs?.map((img, i) => (
          <CarouselItem key={`carousel-item-${i}`}>
            <Image
              src={img.url}
              alt={`Screenshot-${i}`}
              expandable={expandable}
            ></Image>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1 text-black border-black" />
      <CarouselNext className="right-1 text-black border-black" />
    </Carousel>
  );
}
