"use client";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Link } from "@/i18n/routing";

import { type ReactNode } from "react";

export default function BookCard({ Book }: { Book?: any }): ReactNode {
  return (
    <Card className="py-4" key={Book.id} isPressable>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          width={570}
          alt="Card background"
          className="object-cover rounded-xl w-full"
          src="https://nextui.org/images/hero-card-complete.jpeg"
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 ml-4 text-left">
        <Link href={`Book/${Book.id}`}>
          <h4 className="font-bold text-large hover:underline hover:text-success">Frontend Radio</h4>
        </Link>
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <small className="text-default-400">12 Tracks</small>
      </CardBody>
    </Card>
  );
}
