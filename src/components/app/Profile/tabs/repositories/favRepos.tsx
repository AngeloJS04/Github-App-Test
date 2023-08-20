import Repository from '@/components/app/repository'
import { useDebounce } from '@/hooks/Debounce'
import { RepositoryProps } from '@/redux/rtk/users/user.interface'
import React from 'react'

const RepositoriesFav = () => {

    const reposFav = localStorage.getItem('favorites')
    const [search, setSearch] = React.useState<string>('')

    // DEBOUNCE THE SEARCH INPUT
    const debouncedSearchTerm = useDebounce<string>(search, 1000)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

    //FILTER THE FAVORITES REPOS BY NAME 
    const filterRepos = (repos: RepositoryProps[]) => {
        return repos.filter((repo: RepositoryProps) => {
            return repo.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        })
    }

    const repositoriesFavWithFilter = filterRepos(reposFav ? JSON.parse(reposFav) : [])

    return (
        <div>
            <div className='flex items-center justify-center w-full px-4 py-2'>
                <input type="text" placeholder="Search repository" onChange={handleChange} className="w-full px-3 py-2 border bg-base-100 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
            <div className="grid grid-cols-12 ">
                {
                    repositoriesFavWithFilter?.map((repo: RepositoryProps, index: number) => {
                        return (<Repository repo={repo} key={`${repo.id}-${index}`}  alReadyFav={true} />)
                    })
                }
            </div>
        </div>
    )
}

export default RepositoriesFav