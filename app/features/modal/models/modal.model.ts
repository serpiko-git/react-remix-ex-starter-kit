import { Dispatch, ReactElement, SetStateAction } from 'react';

export interface ModalProps {
  title?: string;
  header?: string;
  /** `true`일 경우 오픈 */
  onOpen?: boolean;
  onSetOpen?: Dispatch<SetStateAction<boolean>>;
  children?: ReactElement | null;
}
