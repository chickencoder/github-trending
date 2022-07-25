import { Alert, Container } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useFavourites } from "../../context/FavouriteContext";
import { Repository } from "../Repository";

export const Favourites = () => {
  const { items } = useFavourites();
  return (
    <Container>
      {items.map((repo) => <Repository repo={repo} key={repo.id}/>)}

      {!items.length && 
        <Alert icon={<AlertCircle size={16} />} title="No Favourites yet!" color="teal">
          You do not have any favourites yet, click on star to add!
        </Alert>}
    </Container>
  );
}