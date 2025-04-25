import { BestProducts } from "@/components/ui/home/BestProducts";
import { OurCategories } from "@/components/ui/home/OurCategories";
import { SaleSteps } from "@/components/ui/home/SaleSteps";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full h-[600px] bg-slate-300">
        PROMOCIONES
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
