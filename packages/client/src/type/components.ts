export type CompontsProps =  {
  onClick?: () => void;
  style?: React.CSSProperties;
  customClass?: string;
  children?: React.ReactNode;
  placeholder?: string;
  type?: string;
  text?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?:string | number | boolean;
}
