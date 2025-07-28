export default interface Toast {
  id: string;
  variant: 'success' | 'error' | 'info' | 'warning';
  text: string;
}
export default interface UIState {
  toasts: Toast[];
}