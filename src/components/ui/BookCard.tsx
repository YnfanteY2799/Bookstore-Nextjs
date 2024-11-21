"use client";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Link } from "@/i18n/routing";

import type { IBookCardProps } from "@/types";
import type { ReactNode } from "react";
import { Heart } from "@phosphor-icons/react";

export default function BookCard(props: IBookCardProps): ReactNode {
  // Props
  const { id, author, title, genre, year, totalLikes, coverImage, rating } = props;

  console.log(coverImage);

  return (
    <Card className="py-4" key={id} isPressable as="div">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          width={570}
          alt="Card background"
          className="object-cover rounded-xl w-full"
          src={coverImage ?? "https://nextui.org/images/hero-card-complete.jpeg"}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 ml-4 text-left">
        <Link href={`Book/${id}`} className="font-bold text-large hover:underline hover:text-success">
          {title}
        </Link>
        <p className="text-tiny uppercase font-bold">{author}</p>
        <small className="text-default-500">{(genre ?? []).join(", ")}</small>
        <small className="text-default-400">{year}</small>
      </CardBody>
    </Card>
  );
}
