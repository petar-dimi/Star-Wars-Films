import { cleanup, waitFor } from "@testing-library/react"
import { allFilmsData, errorAllFilmsMock, getAllFilmsWrapper, successAllFilmsMock } from "../mocks/AllFilms";
import { error } from "console";
import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";


describe("useAllFilms Hook when successful", () => {
  afterEach(()=> {
    cleanup();
  });
  const {result} = getAllFilmsWrapper(successAllFilmsMock);
  it("should be defined and then return correct data", async () => {
    expect(result).toBeDefined();
    await waitFor(() => {
      expect(result.current).toEqual({
        loading: false,
        error: undefined,
        data: allFilmsData,
      });
    });
  });

});


describe("useAllFilms Hook when errors", () => {
  afterEach(()=> {
    cleanup()
  });
  const {result} = getAllFilmsWrapper(errorAllFilmsMock);

  it("should be defined and then return error", async() => {
    expect(result).toBeDefined();
    await waitFor(() => {
      expect(result.current).toEqual({
        loading: false,
        error: new ApolloError({
          graphQLErrors:[new GraphQLError("Fetch error!")]
        }),
        data: undefined,
      });
    });
  });
});