"use client";
import { Card, CardBody, CardHeader } from "@heroui/card";
import React, { FC, useState } from "react";
import { ImagesSelector } from "./ImagesSelector";
import { CalificationStars } from "../CalificationStars";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { AmountCounter } from "../../cart/AmountCounter";
import { Image } from "@heroui/image";
import { AuthContext } from '@/context/auth';
import { CartContext } from '@/context/cart';

type Feature = {
  feature: string;
  value: string;
};

interface Props {
  name: string;
  id: string;
  images: string[];
  price: string;
  stock: number;
  category: string;
  subCategory: string;
  discountPercent: number;
  description: string;
  features: Feature[];
  imageColors?: {color: string, image: string}[];
  onColorSelected: (color: string) => void;
}

export const ProductDetail: FC<Props> = ({
  id,
  name,
  stock,
  price,
  category,
  subCategory,
  images,
  discountPercent,
  description,
  features,
  onColorSelected,
  imageColors
}) => {
  const [color, setColor] = React.useState<string>(imageColors ? imageColors[0].color : "");

  const { isLogged } = React.useContext(AuthContext);
  const { onAddItem, id: cartId, isAddingItem, onAddMemoryItem } = React.useContext(CartContext);
  const [amount, setAmount] = useState(1);
  
  const handleSelectColor = (selected: string) => {
    setColor(selected);
    onColorSelected(selected);
  };

  const handleChangeAmount = (newAmount: number) => {
    setAmount(newAmount);
  }

  const handleAddToCart = () => {
    if (isLogged) {
        onAddItem({ product_id: id, amount, cart_id: cartId });
      } else {
        onAddMemoryItem({
          id: "",
          product_id: id,
          amount,
          description: description,
          image: images[0],
          name: name,
          category: category,
          price: price,
          total: parseFloat(price) * amount + "",
          stock: stock,
        });
      }
  };

  return (
    <Card>
      <CardBody className="flex flex-col p-6">
        <div className="flex ">
          <ImagesSelector images={images} />
          <div className="w-full h-[600px] py-4 px-6 flex flex-col gap-3">
            <div className="flex flex-col w-full gap-4">
              <div>
                <div className="flex gap-3 uppercase text-default-600 text-lg">
                  <span>{category}</span>-<span>{subCategory}</span>
                </div>
                <h4 className="text-4xl font-semibold">{name}</h4>
              </div>
              <div className="flex gap-2">
                <span className="text-lg">Calificación: </span>
                <CalificationStars stars={5} />
                <Link
                  underline="always"
                  color="foreground"
                  className="cursor-pointer"
                >
                  5 (2)
                </Link>
              </div>
            </div>
            <Divider className="bg-default-300" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-start gap-1">
                  <p className="text-2xl font-semibold text-red-500">
                    S/ {price}
                  </p>
                  {discountPercent && (
                    <p className="-mt-1 line-through text-md text-default-500">
                      S/ {Number.parseFloat(price) + 100}
                    </p>
                  )}
                </div>
                {discountPercent && (
                  <Chip variant="flat" size="md" color="danger" radius="sm">
                    -{discountPercent}%
                  </Chip>
                )}
              </div>
              {
                imageColors
                && (
                   <div className="w-full">
                    <span>
                      <b>Color: </b>
                      {color}
                    </span>
                    <div className="flex gap-2 p-2">
                      {imageColors.map((ic) => (
                        <div
                          onClick={(e) => handleSelectColor(ic.color)}
                          key={ic.color}
                          className={`w-[70px] cursor-pointer h-[70px] p-1 rounded-2xl border-2 ${color == ic.color ? "border-default-800" : "border-default-100"}`}
                        >
                          <Image src={ic.image} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) 
              }
              <div className="flex flex-col gap-3">
                {
                  stock
                  ? (
                    <>
                      <AmountCounter onChange={handleChangeAmount} minValue={1} maxValue={stock} size="lg" />
                      <Button
                        className="w-[350px] text-lg"
                        size="lg"
                        color="primary"
                        onPress={handleAddToCart}
                        isLoading={isAddingItem}
                        variant="shadow"
                      >
                        Agregar al Carrito
                      </Button>
                  </>
                  )
                  : (
                    <Chip size="lg" color="danger" variant="faded">Producto Agotado</Chip>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-20 mt-4">
          <div className="flex flex-col w-[60%] gap-4">
            <h5 className="text-lg font-semibold">Descripción</h5>
            <Divider className="h-[2px] mb-4 bg-default-500" />
            <p className="self-center text-default-600">{description}</p>
          </div>
          <div className="flex flex-col w-[40%] gap-4">
            <h5 className="text-lg font-semibold">Especificaciones</h5>
            <Divider className="h-[2px] mb-4 bg-default-500" />
            <div className="flex flex-col items-center w-full gap-4">
              {features.map((feature, index) => ( 
                <div key={index} className="px-12 flex justify-between w-full gap-2">
                  <span className="font-semibold w-[40%]">{feature.feature}:</span>
                  <span>{feature.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
