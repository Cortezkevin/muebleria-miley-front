import { BestProducts } from "@/components/ui/home/BestProducts";
import { OurCategories } from "@/components/ui/home/OurCategories";
import { SaleSteps } from "@/components/ui/home/SaleSteps";
import { Image } from "@heroui/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full bg-slate-300 rounded-2xl">
        <Image src={"https://colineal.com/cdn/shop/files/Banner-WEB-Full-House.jpg?v=1751664339&width=2500"} />
      </div>
      <div className="w-full h-[70px] flex items-center px-4">
        <SaleSteps />
      </div>
      <div className="w-full h-[500px] grid items-center">
        <OurCategories />
      </div>
      <div className="w-full h-[400px] ">
        <BestProducts />
      </div>
    </div>
  );
}
