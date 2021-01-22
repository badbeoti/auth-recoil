import { atom } from 'recoil';

export const testState = atom<{
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  test: boolean;
}>({
  key: 'test',
  default: {
    user: null,
    test: false,
  },
});
