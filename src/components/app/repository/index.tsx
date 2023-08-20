import { RepositoryPropsI } from '@/interface/components/repository.interface'
import { getLanguageIconSrc } from '@/utils/getLanguageIcon.utils'
import React from 'react'
import Icon from '../icons/icons'


const Repository = ({ repo, favorite = false, col, handleFavorite, alReadyFav = false }: RepositoryPropsI) => {

    const maxLength = 120;
    const [isFavorite, setIsFavorite] = React.useState(false);
    const displayText = repo?.description ? repo?.description?.substring(0, maxLength - 3) + '...' : 'No description'

    return (
        <div className={`relative repo-card col-span-12 ${col || 'md:col-span-6'} mx-2 my-2 shadow-xl border bg-black/20 hover:bg-black/30 p-3 border-gray-600 rounded-lg  h-36`}>
            <div className=" rounded p-2">
                <div className=" justify-between items-center">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center'>
                            <Icon icon='bookmarks' className='mr-1' />
                            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-blue-500 font-bold text-sm hover:underline">{repo.name}</a>
                        </div>
                        <div className="flex items-center" {...(favorite && {
                            onClick: () => { setIsFavorite(!isFavorite), handleFavorite && handleFavorite() }
                        })}>
                            <Icon icon='star' className={`mr-1 cursor-pointer ${isFavorite || alReadyFav ? 'text-yellow-400 ' : 'material-symbols-outlined'}`} />
                            <span className="text-gray-400 text-xs pr-3">{isFavorite ? repo.stargazers_count + 1 : repo.stargazers_count}</span>
                            {!favorite && (<span className='badge badge-neutral'>{repo.private ? 'Private' : 'Public'}</span>)}
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs mt-1">{displayText}</p>
                    </div>

                    <div className='flex justify-around items-center contentBottom'>
                        {
                            repo.language && (
                                <div className="flex items-center pl-2 mt-1">
                                    {repo.language == "HTML" ? (
                                        <Icon icon="terminal" className="mr-1" />) : (
                                        <img src={getLanguageIconSrc(repo.language)} alt="repo-language" width={12} height={12} className="mr-1" />
                                    )}
                                    <span className="text-gray-400 text-xs">{repo.language}</span>
                                </div>
                            )
                        }
                        <div className='flex'>
                            <div className="flex items-center pr-2">
                                <Icon icon='account_tree' className='mr-1' />
                                <span className="text-gray-400 text-xs">{repo.forks_count}</span>
                            </div>
                            <span onClick={() => window.open(repo.clone_url, '_blank')} className="badge badge-neutral  mr-0 md:mr-2">
                                <Icon icon='terminal' className='mr-1' />
                                Clone
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Repository