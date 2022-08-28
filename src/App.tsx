import React, { useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import MultiSelectMenu from "./components/MultiSelectMenu";
import { movies$ } from "./movies";
import { Movie, moviesActions, moviesSelectors } from "./features/Movie";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { paginationActions, paginationSelectors } from "./features/Pagination";
import OffsetSelector from "./components/OffsetSelector";
import PageSelector from "./components/PageSelector";

const App = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const offset = useAppSelector(paginationSelectors.getOffset);
  const currentPage = useAppSelector(paginationSelectors.getCurrentPage);

  const loadMovies = async () => {
    try {
      const films = (await movies$) as Movie[];
      dispatch(moviesActions.setMovies(films));
    } catch (error) {
      throw new Error("reading data went wrong");
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const moviesLength = useAppSelector(moviesSelectors.getMoviesLength);
  const numberOfPages =
    moviesLength % offset
      ? Math.floor(moviesLength / offset) + 1
      : Math.floor(moviesLength / offset);
  const firstDisplayedMovieIndex = offset * currentPage - offset;

  const movies = useAppSelector(
    moviesSelectors.getPaginatedMovies(
      firstDisplayedMovieIndex,
      firstDisplayedMovieIndex + offset
    )
  );

  return (
    <div className={"container"}>
      <div className={"header"}>
        <MultiSelectMenu
          label="Categories"
          options={["Bat", "Tiger", "Lion"]}
        />
        <OffsetSelector />
      </div>
      <div className={"main"}>
        {movies.length
          ? movies.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                subtitle={movie.category}
                title={movie.title}
                activeLeftIcon={!!movie.liked}
                barValue={(movie.likes * 100) / (movie.likes + movie.dislikes)}
                onPressLeftButton={(id: string) =>
                  dispatch(moviesActions.toggleLike(id))
                }
                onPressRightButton={(id: string) =>
                  dispatch(moviesActions.deleteMovieById(id))
                }
              />
            ))
          : "You have deleted all the movies"}
      </div>
      <div className={"footer"}>
        {numberOfPages > 1 && (
          <PageSelector
            numberOfPages={numberOfPages}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default App;
