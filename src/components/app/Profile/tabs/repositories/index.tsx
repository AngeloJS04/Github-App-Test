import Repository from '@/components/app/repository';
import RepositorySkeleton from '@/components/app/repository/repositorySkeleton';
import { useGetMeQuery, useGetRepostoriesQuery } from '@/redux/rtk/me';
import { useGetReposQuery } from '@/redux/rtk/users';
import { RepositoryProps } from '@/redux/rtk/users/user.interface';
import React from 'react';

const Repositories = ({ username }: { username: string }) => {
    
     // Fetch the repositories for the specified user and the logged-in user's repositories
  const { data: General_Repos } = useGetReposQuery(username);
  const { data: Owner_Repos } = useGetRepostoriesQuery({});
  const { data: UserLogged } = useGetMeQuery({});

  // Determine which repositories to display based on the user
  const reposToDisplay = UserLogged && UserLogged.login === username ? Owner_Repos : General_Repos;

  return (
    <div>
      <div className="grid grid-cols-12">
        {reposToDisplay
          ? reposToDisplay.map((repo: RepositoryProps, index: number) => (
              <Repository repo={repo} key={`${repo.id}-${index}`} />
            ))
          : Array.from(Array(10).keys()).map((index: number) => (
              <RepositorySkeleton key={index} col={"md:col-span-6"} />
            ))}
      </div>
    </div>
  );
};

export default Repositories;
