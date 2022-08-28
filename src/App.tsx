import React, { useEffect } from "react";
import { movies$ } from "./movies";
import { Movie, moviesActions, moviesSelectors } from "./features/Movie";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { filtersActions, filtersSelectors } from "./features/Filters";
import "./App.css";
import OffsetSelector from "./components/OffsetSelector";
import PageSelector from "./components/PageSelector";
import Card from "./components/Card";
import MultiSelectMenu from "./components/MultiSelectMenu";

const App = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const offset = useAppSelector(filtersSelectors.getOffset);
  const currentPage = useAppSelector(filtersSelectors.getCurrentPage);

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

  const categories = useAppSelector(moviesSelectors.getCategories);

  useEffect(() => {
    dispatch(filtersActions.setSelectedCategories(categories));
  }, [dispatch, categories]);

  const moviesLength = useAppSelector(moviesSelectors.getMoviesLength);
  const numberOfPages =
    moviesLength % offset
      ? Math.floor(moviesLength / offset) + 1
      : Math.floor(moviesLength / offset);
  const firstDisplayedMovieIndex = offset * currentPage - offset;

  const selectedCategories = useAppSelector(
    filtersSelectors.getSelectedCategories
  );

  const movies = useAppSelector(
    moviesSelectors.getFilteredMovies(
      firstDisplayedMovieIndex,
      firstDisplayedMovieIndex + offset,
      selectedCategories
    )
  );

  useEffect(() => {
    if (!movies.length) {
      dispatch(filtersActions.setCurrentPage(1));
    }
  }, [movies, dispatch]);

  return (
    <div className={"container"}>
      <div className={"header"}>
        <MultiSelectMenu label={"Categories"} options={categories} />
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
          : "No movies to be displayed"}
      </div>
      <div className={"footer"}>
        {numberOfPages > 1 && movies.length ? (
          <PageSelector
            numberOfPages={numberOfPages}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
