export interface IMessage {
  id: string;
  message: string;
}

export interface IWaiter {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  feedbacks: IFeedback[];
  tables: { id: string }[];
}

export interface IFeedback {
  id: string;
  feedback: string;
  rating: number;
  createdAt: string;
}

export interface IDisabledCategory {
  id: string;
}

export interface ITable {
  id: string;
  name: string;
  users: { id: string }[];
  disabledCategories: IDisabledCategory[];
  messages: IMessage[];
}

export interface IType {
  id: string;
  name: string;
}

export interface IAllergen {
  id: string;
  name: string;
}

export interface ICustomAddition {
  choices: IChoice[];
  service: string;
}

export interface IChoice {
  name: string;
  price: number;
}

export interface IArticle {
  id: string;
  name: string;
  description: string;
  price: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpecial: boolean;
  isForLegalAgeOnly: boolean;
  spiceLevel: string;
  removableIngredients: string[];
  ingredients: string[];
  customAdditions: ICustomAddition[];
  allergens: IAllergen[];
}

export interface ICategory {
  id: string;
  name: string;
  type: IType;
  articles: IArticle[];
}

export enum HospitalityVenueType {
  RESTAURANT = "RESTAURANT",
  BAR = "BAR",
  CAFE = "CAFE",
  PUB = "PUB",
  CLUB = "CLUB",
  HOTEL = "HOTEL",
  HOSTEL = "HOSTEL",
  MOTEL = "MOTEL",
}

export interface IHospitalityVenue {
  id: string;
  name: string;
  city: string;
  displayName: string;
  address: string;
  type: HospitalityVenueType;
  tables: ITable[];
  users: IWaiter[];
  categories: ICategory[];
  messages: IMessage[];
}
