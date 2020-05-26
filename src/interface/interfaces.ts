export interface useStateProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
