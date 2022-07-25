import { Badge, Card, Group, Text } from "@mantine/core";
import { GithubRepo } from "../../types/github"
import { FavouriteButton } from "../FavouriteButton";

interface RepositoryProps {
  repo: GithubRepo;
}

export const Repository = ({ repo }: RepositoryProps) => {
  const { id, name, html_url, stargazers_count, description } = repo;
  return (
    <Card style={{ marginBottom: '10px' }}>
      <Group position="apart" style={{ marginBottom: 5, marginTop: 5 }}>
        <Text weight={500} variant={'link'}>
          <a href={html_url} target={'_blank'} rel="noreferrer">{name}</a>
        </Text>
        <Badge sx={{ paddingLeft: 5 }} size="lg" radius="xl" color="teal" leftSection={<FavouriteButton repo={repo}/>}>
          {stargazers_count}
        </Badge>
      </Group>

      <Text size={'sm'}>
        {description}
      </Text>
    </Card>
  );
}