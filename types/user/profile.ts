export type UpdateProfileDTO = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  photoUrl: string;
}

export type PersonalDataDTO = {
  firstName: string;
  lastName: string;
  phone: string;
  birthdate?: string;
}

export type NotificationDTO = {
  id: string;
  title: string;
  body: string;
  date: string;
}