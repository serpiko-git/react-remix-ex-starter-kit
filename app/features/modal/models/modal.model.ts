import { Dispatch, ReactElement, SetStateAction } from 'react';

export interface ModalProps {
  /** `true`일 경우 오픈 */
  onOpen?: boolean;
  onSetOpen?: Dispatch<SetStateAction<boolean>>;
  children?: ReactElement | null;
}
