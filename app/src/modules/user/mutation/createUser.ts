import { trpc } from '../../trpc/client';

export const createUser = () => {
	const mutate = trpc.createUser.useMutation();

	return null;
};
