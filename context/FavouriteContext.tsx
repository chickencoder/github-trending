import { createContext, useContext, useEffect, useState } from "react";
import { GithubRepo } from "../types/github";

const STORAGE_KEY: string = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY!;

// context type
interface FavouriteContextProps {
  items: GithubRepo[];
  add: (repo: GithubRepo) => void;
  remove: (id: number) => void;
  isFav: (id: number) => boolean;
}

const FavouriteContext = createContext<FavouriteContextProps>({} as FavouriteContextProps);

export default FavouriteContext;

interface FavState {
  items: GithubRepo[]
}
const defaultState = {
  items: []
}

interface Props {
  children: React.ReactNode;
}

export const FavouriteProvider: React.FC<Props> = ({ children }) => {
  const [favState, setFavState] = useState<FavState>(defaultState);

  // check if Repo is favourited
  const isFav = (repoId: number) => {
    return favState.items.filter(({id}) => id === repoId).length > 0;
  }

  // add to favourites
  const add = (repo: GithubRepo) => {
    const data = {
      items: [...favState.items, repo]
    };

    // refresh state and storage
    setFavState(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  // remove from favourites
  const remove = (repoId: number) => {
    const data = {
      items: [...favState.items.filter(({ id }) => id !== repoId)]
    };

    // refresh state and storage
    setFavState(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  
  // set initial state for the favourites
  useEffect(() => {
    const initialState = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultState)
    );

    setFavState(initialState);
  }, []);

  return (
    <FavouriteContext.Provider
      value={{
        items: favState.items,
        isFav,
        add,
        remove,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  )
}

export const useFavourites = () => {
  const ctx = useContext(FavouriteContext)

  if (ctx === undefined) {
    throw new Error('No favourites state')
  }

  return ctx
}