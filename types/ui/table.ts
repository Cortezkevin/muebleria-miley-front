export type TableColumn<T> = {
  key: keyof T | 'actions';
  title: string;
}