import { Star } from "tabler-icons-react";
import { useFavourites } from "../../context/FavouriteContext";
import { GithubRepo } from "../../types/github";

interface FavouriteButtonProps {
  repo: GithubRepo;
}

export const FavouriteButton = ({repo}: FavouriteButtonProps) => {
  const { isFav, add, remove } = useFavourites();

  const handleFavAdd = () => {
    add(repo);
  }
  const handleFavRemove = () => {
    remove(repo.id);
  }

  return (
    <Star
      className="favButton"
      fill={isFav(repo.id) ? 'currentColor' : 'none'}
      onClick={isFav(repo.id) ? handleFavRemove : handleFavAdd} 
      size={16} 
      style={{
        display: 'flex',
      }}
    />
  );
}