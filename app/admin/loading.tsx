import { Spinner } from "@heroui/spinner";

export default function Loading(){
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner label="Cargando..." size="lg" color="warning" />
    </div>
  )
}