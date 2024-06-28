export interface IMessage {
  id: string;
  message: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  feedbacks: IFeedback[];
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
  users: IUser[];
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

export interface IHospitalityVenue {
  id: string;
  name: string;
  city: string;
  displayName: string;
  address: string;
  tables: ITable[];
  users: IUser[];
  categories: ICategory[];
  messages: IMessage[];
}