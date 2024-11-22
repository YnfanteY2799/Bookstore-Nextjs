"use client";
import { Card, CardHeader, CardBody, Image, Button, CardFooter } from "@nextui-org/react";
import { Heart, Star } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import NextImage from "next/image";

import type { IBookCardProps } from "@/types";
import type { ReactNode } from "react";

export default function BookCard({ id, author, title, genre, year, image, rating, reviews }: IBookCardProps): ReactNode {
  const t = useTranslations("Form_Labels");

  return (
    <Card className="py-4" key={id} isPressable as="div">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          width={300}
          src={image}
          height={150}
          alt="Card background"
          className="object-cover rounded-xl w-full"
          fallbackSrc="https://via.placeholder.com/300x200"
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 ml-4 text-left">
        <Link href={`Book/${id}`} className="font-bold text-large hover:underline hover:text-success text-default-700">
          {title}
        </Link>
        <p className="text-tiny uppercase font-bold text-default-500">{author}</p>
        <small className="text-default-400">{(genre ?? []).join(",")}</small>
        <small className="text-default-400">{year}</small>
      </CardBody>
      <CardFooter className="flex justify-between pb-2">
        <div className="flex justify-center ml-4 text-sm">
          <small className="flex justify-center gap-1">
            <Star fill="yellow" size={18} /> {rating}
          </small>
          /
          <small className="hover:underline">
            {reviews} {t("reviews")}
          </small>
        </div>
        <div className="mr-4">
          <Button isIconOnly size="sm" variant="light">
            <Heart size={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
