import { useQuery } from "@tanstack/react-query";
import { Alert, Container, Loader, Pagination } from '@mantine/core';
import { AlertCircle } from "tabler-icons-react";
import { getGithubRepos } from "../../queries/github";
import { useState } from "react";
import { Repository } from "../Repository/Repository";

interface RepositoryListProps {
  languages?: string[]
}

export const RepositoryList = ({ languages = [] }: RepositoryListProps) => {
    const [perPage, setPerPage] = useState(30);
    const [page, setPage] = useState(1);


    const { data, isLoading, isError } = useQuery(
      ['github-trends', page, perPage, languages], 
      () => getGithubRepos({per_page: perPage, page, language: languages.join(',')}), 
      { retry: 1 }
    );

    if (isLoading) {
      return <Loader variant="dots"/>;
    }

    if (isError) {
      return <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red">
      Something terrible happened!
    </Alert>;
    }

    const { total_count, items } = data;

    const handlePageChange = (page: number) => {
      setPage(page);
    }

    

    return (
      <Container>
        {items.map((repo) => <Repository repo={repo} key={repo.id}/>)}
        <Pagination initialPage={page} total={Math.ceil(total_count / 30)} onChange={handlePageChange}/>
      </Container>
    );
}