import {trpc} from '../../trpc/client';

export const getMyProfile = () => {
  const myProfile = trpc.getMyProfile.useQuery();

  return myProfile;
};
