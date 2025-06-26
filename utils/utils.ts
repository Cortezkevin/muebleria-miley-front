export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12;
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} - ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;
};

export const passOneDay = (dateString: string) => {
  const actualDate = new Date();
  const date = new Date(dateString);

  const d = actualDate.getTime() - date.getTime();
  const dayInMilis = 1000 * 60 * 60 * 24;

  if (d >= dayInMilis) {
    return true;
  } else {
    return false;
  }
};

export const formatDiasAHoras = (dias: number) => {
  const cantidadDias = Math.floor(dias);
  const horasRestantes = Math.round((dias - cantidadDias) * 24);
  
  if (cantidadDias === 0 && horasRestantes === 0) {
    return `Menos de una hora`;
  }
  
  let result = `${cantidadDias} día${cantidadDias !== 1 ? 's' : ''}`;
  if (horasRestantes > 0) {
    result += ` y ${horasRestantes} hora${horasRestantes !== 1 ? 's' : ''}`;
  }
  
  return result;
};

export const getMonthName = (monthNumber: number) => {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Verifica que el número de mes esté dentro del rango válido
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1]; // Arrays en JavaScript son base 0
  } else {
    return "Mes inválido";
  }
};
