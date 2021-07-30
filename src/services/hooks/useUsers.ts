import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../axios/api";

type User = {
  id: string,
  name: string,
  email: string,
  createdAt: string,  
}

interface getUsersProps {
  totalCount: number;
  users: User[];
}

export const getUsers = async (page: number): Promise<getUsersProps> => {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => {
      return{
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      };
  });

  return {
    users,
    totalCount, 
  };
}
//export function useUsers (page: number, options: UseQueryOptions) {
export function useUsers (page: number) {
  return useQuery(['users', page], () => getUsers(page) , {
    staleTime: 1000 * 60 * 10, //10 minutos
    //...options,
  })
}