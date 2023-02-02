export interface Item{
  placeholder?:string;
  inputPlaceholder?:string;
  placeholderEn?:string;
  inputPlaceholderEn?:string;
  searachable?:boolean;
  apiPath?:string;
  staticArray?:any,
  multiSelect?:boolean;
  apiPathUpdate?:string;
  subContent?:string;
  required?:boolean;
  oldSelectedItems?:any;
  imgsrc?:boolean;
  imgFolder?:string;
  imgName?:string;
  signUp?:boolean;
  creator?: boolean;
  messageErrorRequired?:string;
  messageErrorRequiredEn?:string;
  mealItem?: boolean;
  fieldsDDL?: boolean;
  subfieldsDDL?: boolean;
  noDataMessage?: boolean;
  changePhoneDDL?: boolean
}
export  interface FilterObject{
  limit ?: number;
  offset ?:number;
  search ?:string;
  country_id?:any
}