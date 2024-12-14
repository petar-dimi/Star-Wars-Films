import {MockedProvider, MockedResponse } from "@apollo/client/testing";
import { renderHook } from "@testing-library/react";
import React, { Children } from "react";
import useAllFilms from "../hooks/IndexHook";
import { request } from "http";
import { GET_ALL_FILMS } from "../queries";
import { ApolloError } from "@apollo/client";
import { graphql, GraphQLError } from "graphql";

export const allFilmsData= {
  allFilms:{
    films:[
      {
        id:"ZmlsbXM6MQ==",
        title:"A New Hope",
        director: "George Lucas",
        releaseDate: "1977-05-25",
        producers: [
          "Gary Kurtz",
          "Rick McCallum"
        ],

      },
    ],
  },
};


export const successAllFilmsMock: MockedResponse[] = [
  {
    request:{
      query: GET_ALL_FILMS
    },
    result:{
      data: allFilmsData,
    },
  },
];



export const errorAllFilmsMock: MockedResponse[] = [
  {
    request:{
      query: GET_ALL_FILMS
    },
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("Fetch error!"),],
    })
  },
];



export function getAllFilmsWrapper(mockData: MockedResponse[] = [] ) {
  const wrapper = ({children}: React.PropsWithChildren) =>(
    <MockedProvider mocks={mockData} addTypename={false}>
      {children}
    </MockedProvider>
  );
  const {result} = renderHook(() => useAllFilms(), {wrapper});

  return{
    result,
  };
}